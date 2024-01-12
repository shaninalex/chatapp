package client

import (
	"encoding/json"
	"log"

	"gosrc.io/xmpp/stanza"
)

type IncommingMessage struct {
	Type    stanza.StanzaType `json:"type" binding:"required"`
	Payload interface{}       `json:"payload" binding:"required"`
}

func (c *Client) handleWebsocketMessage(message []byte) {
	var msg IncommingMessage
	err := json.Unmarshal(message, &msg)
	// is chat message
	if err != nil {
		log.Println(err)
	}

	// generate XMPP stanza
	m := stanza.Message{Attrs: stanza.Attrs{To: "alice@localhost"}, Body: "Hello, buddy..."}

	// send generated XMPP message
	c.XMPPClient.Send(m)
}
