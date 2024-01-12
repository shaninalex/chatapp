package client

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"gosrc.io/xmpp"
	"gosrc.io/xmpp/stanza"
)

func (c *Client) XMPPMessageHandler(s xmpp.Sender, p stanza.Packet) {
	msg, ok := p.(stanza.Message)
	if !ok {
		_, _ = fmt.Fprintf(os.Stdout, "Ignoring packet: %T\n", p)
		return
	}
	// _, _ = fmt.Fprintf(os.Stdout, "Body = %s - from = %s\n", msg.Body, msg.From)
	log.Printf("Body = %s - from = %s\n", msg.Body, msg.From)

	c.WSConnection.WriteMessage(1, compileMessage(msg))
}

func compileMessage(msg stanza.Message) []byte {
	m, err := json.Marshal(map[string]interface{}{
		"from": msg.From,
		"to":   msg.To,
		"body": msg.Body,
	})
	if err != nil {
		return nil
	}
	return m
}
