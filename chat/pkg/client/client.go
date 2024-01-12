package client

import (
	"context"
	"crypto/tls"
	"errors"
	"log"
	"os"

	"github.com/gorilla/websocket"
	"gosrc.io/xmpp"
)

type Client struct {
	ID           string
	ClientId     string
	WSConnection *websocket.Conn
	Context      context.Context
	XMPPClient   *xmpp.Client
}

func initClient(user map[string]interface{}, ws *websocket.Conn) (*Client, error) {

	jid, ok := user["jid"].(string)
	if !ok {
		return nil, errors.New("unable to get user jid")
	}

	token, err := getUserXMPPAuthToken(jid)
	if err != nil {
		return nil, errors.New("unable to get user jid")
	}

	config := xmpp.Config{
		TransportConfiguration: xmpp.TransportConfiguration{
			Address:   "localhost:5222",
			TLSConfig: &tls.Config{InsecureSkipVerify: true},
		},
		Jid:          jid,
		Credential:   xmpp.Password(token), // TODO: it should not be raw password!
		StreamLogger: os.Stdout,
		Insecure:     true,
	}

	router := xmpp.NewRouter()
	router.HandleFunc("message", nil)

	xmppClient, err := xmpp.NewClient(&config, router, nil)
	if err != nil {
		log.Fatalf("%+v", err)
	}

	// If you pass the client to a connection manager, it will handle the reconnect policy
	// for you automatically.

	client := &Client{
		WSConnection: ws,
		XMPPClient:   xmppClient,
	}
	return client, nil
}

func (c *Client) ConsumeIncommingMessages() {
	for {
		_, message, err := c.WSConnection.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		log.Println(message)
	}
}

func (c *Client) ConsumeXMPPMessages() {
	cm := xmpp.NewStreamManager(c.XMPPClient, nil)
	log.Fatal(cm.Run())
}
