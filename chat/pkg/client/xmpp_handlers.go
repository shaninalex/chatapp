package client

import (
	"encoding/json"
	"fmt"
	"log"
	"os"

	"gosrc.io/xmpp"
	"gosrc.io/xmpp/stanza"
)

/*
TODO: NEED TO PARSE ALL THIS MESSAGES

<message

	xml:lang='en'
	to='admin@localhost'
	from='bob@localhost'
	type='chat'
	id='purple9d2b0d49'>
		<composing xmlns='http://jabber.org/protocol/chatstates'/>

</message>

<message

	xml:lang='en'
	to='admin@localhost'
	from='bob@localhost'
	type='chat'
	id='purple9d2b0d4a'>
	<paused xmlns='http://jabber.org/protocol/chatstates'/>

</message>

<message

	xml:lang='en'
	to='admin@localhost'
	from='bob@localhost'
	type='chat'
	id='purple9d2b0d4b'>
	<active xmlns='http://jabber.org/protocol/chatstates'/>

</message>

<message

	xml:lang='en'
	to='admin@localhost'
	from='bob@localhost'
	type='chat'
	id='purple9d2b0d57'>
	<active xmlns='http://jabber.org/protocol/chatstates'/>
	<body>actual new message</body>

</message>
*/
func (c *Client) XMPPMessageHandler(s xmpp.Sender, p stanza.Packet) {
	msg, ok := p.(stanza.Message)
	if !ok {
		_, _ = fmt.Fprintf(os.Stdout, "Ignoring packet: %T\n", p)
		return
	}

	if msg.Type == stanza.MessageTypeChat {
		c.WSConnection.WriteMessage(1, createChatMessage(msg))
	}

}

func (c *Client) XMPPPresenseHandler(s xmpp.Sender, p stanza.Packet) {
	presence, ok := p.(stanza.Presence)
	if !ok {
		_, _ = fmt.Fprintf(os.Stdout, "Ignoring packet: %T\n", p)
		return
	}

	log.Println(presence.Type)
	// is subscribe request
	if presence.Type == stanza.PresenceTypeSubscribe {
		b, err := createSubscribeMessage(presence)
		if err != nil {
			log.Println(err)
		}
		c.WSConnection.WriteMessage(1, b)
	}

	// is availability request
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
