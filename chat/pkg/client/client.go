package client

import (
	"context"
	"log"

	"github.com/gorilla/websocket"
)

type Client struct {
	ID           string
	ClientId     string
	WSConnection *websocket.Conn
	Context      context.Context
}

func initClient(user map[string]interface{}, ws *websocket.Conn) (*Client, error) {
	client := &Client{
		WSConnection: ws,
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
