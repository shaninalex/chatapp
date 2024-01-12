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

var (
	EJABBERD_HOST = os.Getenv("EJABBERD_HOST")
)

type Client struct {
	User         map[string]interface{}
	WSConnection *websocket.Conn
	Context      context.Context
	XMPPClient   *xmpp.Client
}

func initClient(user map[string]interface{}, ws *websocket.Conn) (*Client, error) {
	client := &Client{
		WSConnection: ws,
		User:         user,
	}
	client.InitXMPPClient()
	return client, nil
}

func (c *Client) InitXMPPClient() {
	jid, ok := c.User["jid"].(string)
	if !ok {
		log.Println(errors.New("unable to get user jid"))
	}

	// TODO: make getUserXMPPAuthToken function as an method of Client
	token, err := getUserXMPPAuthToken(jid)
	if err != nil {
		log.Println(errors.New("unable to get user token"))
	}

	config := xmpp.Config{
		TransportConfiguration: xmpp.TransportConfiguration{
			Address:   EJABBERD_HOST,
			TLSConfig: &tls.Config{InsecureSkipVerify: true},
		},
		Jid:          jid,
		Credential:   xmpp.Password(token), // TODO: it should not be raw password!
		StreamLogger: os.Stdout,
		Insecure:     true,
	}

	router := xmpp.NewRouter()
	router.HandleFunc("message", c.XMPPMessageHandler)
	router.HandleFunc("presense", c.XMPPPresenseHandler)
	router.HandleFunc("iq", c.XMPPIqHandler)
	xmppClient, err := xmpp.NewClient(&config, router, errorHandler)
	if err != nil {
		log.Fatalf("%+v", err)
	}
	c.XMPPClient = xmppClient
}

func (c *Client) ConsumeIncommingMessages() {
	log.Println("Consume incomming messages")
	for {
		_, message, err := c.WSConnection.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		log.Println(message)
		// TODO: is chat message
		// TODO: generate XMPP stanza
		// TODO: send generated XMPP message
	}
}

func (c *Client) ConsumeXMPPMessages() {
	// If you pass the client to a connection manager, it will handle the reconnect policy
	// for you automatically.
	log.Println("Consume XMPP messages")
	cm := xmpp.NewStreamManager(c.XMPPClient, nil)
	log.Fatal(cm.Run())
}
