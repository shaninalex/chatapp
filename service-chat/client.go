package main

import (
	"bytes"
	"context"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

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
	cm := xmpp.NewStreamManager(client, wsclient.GetContactList)
	log.Fatal(cm.Run())
	return wsclient, nil
}

func (c *Client) handleMessage(s xmpp.Sender, p stanza.Packet) {
	message_p, ok := p.(stanza.Message)
	if !ok {
		return
	}
	msg := &Message{Type: TypeMessage, Payload: &message_p}
	_Msg, _ := json.Marshal(msg)
	c.Conn.WriteMessage(1, _Msg)
}

func (c *Client) handlePresence(s xmpp.Sender, p stanza.Packet) {
	message_p, ok := p.(stanza.Presence)
	if !ok {
		return
	}
	msg := &MessagePresense{Type: TypePresence, Payload: &message_p}
	_Msg, _ := json.Marshal(msg)
	c.Conn.WriteMessage(1, _Msg)
}

func (c *Client) GetContactList(cl xmpp.Sender) {
	req, _ := stanza.NewIQ(stanza.Attrs{From: c.Jid, Type: stanza.IQTypeGet})
	req.RosterItems()
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	cc, err := c.Client.SendIQ(ctx, req)

	if err != nil {
		msg := &MessageSystem{Type: TypeSystem, Payload: err.Error()}
		d, _ := json.Marshal(msg)
		c.Send <- d
	}

	go func() {
		serverResp := <-cc
		if rosterItems, ok := serverResp.Payload.(*stanza.RosterItems); ok {
			contacts := rosterItems.Items
			cl := &ContactsList{Items: contacts}
			data, _ := json.Marshal(cl)
			c.Send <- data
			return
		}
	}()
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
