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

func (c *Client) XMPPPresenseHandler(s xmpp.Sender, p stanza.Packet) {
	presense, ok := p.(stanza.Presence)
	if !ok {
		_, _ = fmt.Fprintf(os.Stdout, "Ignoring packet: %T\n", p)
		return
	}
	v, _ := json.Marshal(presense)
	c.WSConnection.WriteMessage(1, v)
}

func (c *Client) XMPPIqHandler(s xmpp.Sender, p stanza.Packet) {
	iq, ok := p.(*stanza.IQ)
	if !ok {
		_, _ = fmt.Fprintf(os.Stdout, "Ignoring packet: %T\n", p)
		return
	}
	v, _ := json.Marshal(iq)
	c.WSConnection.WriteMessage(1, v)
}
