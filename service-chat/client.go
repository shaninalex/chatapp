package main

import (
	"bytes"
	"crypto/tls"
	"encoding/xml"
	"fmt"
	"log"
	"os"

	"github.com/gorilla/websocket"
	"gosrc.io/xmpp"
	"gosrc.io/xmpp/stanza"
)

type Client struct {
	Hub    *Hub
	Conn   *websocket.Conn
	Send   chan []byte
	Client *xmpp.Client
	Jid    string
}

func InitClient(hub *Hub, connection *websocket.Conn, user_id string) (*Client, error) {

	token, err := hub.DB.getToken(user_id)
	if err != nil {
		return nil, err
	}

	jid := fmt.Sprintf("%s@localhost", user_id)
	config := xmpp.Config{
		TransportConfiguration: xmpp.TransportConfiguration{
			Address: EJABBERD_SERVER,
		},
		Jid:          jid,
		Credential:   xmpp.Password(token),
		StreamLogger: os.Stdout,
		Insecure:     true,
	}
	config.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	wsclient := &Client{
		Hub:  hub,
		Conn: connection,
		Send: make(chan []byte),
		Jid:  jid,
	}

	router := xmpp.NewRouter()
	router.HandleFunc("message", wsclient.handleMessage)
	// router.HandleFunc("iq", wsclient.handleIQ)
	router.HandleFunc("presence", wsclient.handlePresence)

	client, err := xmpp.NewClient(&config, router, errorHandler)
	if err != nil {
		return nil, err
	}
	wsclient.Client = client
	cm := xmpp.NewStreamManager(client, nil)
	log.Fatal(cm.Run())
	return wsclient, nil
}

func (c *Client) handleMessage(s xmpp.Sender, p stanza.Packet) {
	_Msg, _ := xml.Marshal(p)
	c.Conn.WriteMessage(1, _Msg)
}

func (c *Client) handlePresence(s xmpp.Sender, p stanza.Packet) {
	_Msg, _ := xml.Marshal(p)
	c.Conn.WriteMessage(1, _Msg)
}

func (c *Client) ReadMessages() {
	defer func() {
		c.Hub.Unregister <- c
		c.Conn.Close()
	}()

	for {
		_, message, err := c.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		message = bytes.TrimSpace(message)
		c.Send <- message
	}
}

func (c *Client) WriteMessages() {
	defer func() {
		c.Conn.Close()
	}()

	for {
		select {
		case message := <-c.Send:
			c.Conn.WriteMessage(1, message)
		}
	}
}

func errorHandler(err error) {
	fmt.Println(err.Error())
}
