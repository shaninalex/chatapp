package client

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"log"

	"gosrc.io/xmpp/stanza"
)

type MsgPayloadTo struct {
	To string `json:"to"`
}

type MsgPayloadMessage struct {
	To   string `json:"to"`
	Body string `json:"body"`
}

type IncommingMessage struct {
	Type    stanza.StanzaType      `json:"type" binding:"required"`
	Payload map[string]interface{} `json:"payload" binding:"required"`
}

func (c *Client) handleWebsocketMessage(message []byte) {
	var msg IncommingMessage

	// is chat message
	err := json.Unmarshal(message, &msg)
	if err != nil {
		log.Println(err)
	}

	// enerate response
	if msg.Type == stanza.PresenceTypeSubscribed {
		m := xmppMessageSubscribed(c, msg)
		go c.XMPPClient.Send(m)
	}

	if msg.Type == stanza.PresenceTypeSubscribe {
		m := xmppMessageSubscribe(c, msg)
		go c.XMPPClient.Send(m)
	}

	if msg.Type == stanza.MessageTypeChat {
		m, valid := xmppMessageChatMessage(c, msg)
		if valid {
			go c.XMPPClient.Send(m)
		}
	}

	if msg.Type == stanza.IQTypeSet {
		action, ok := msg.Payload["action"].(string)
		if !ok {
			log.Println("unable to parse \"action\" payload")
		}

		if action == "create_room" {
			go c.XMPPClient.Send(xmppMessageCreateRoom(c, msg))
		}

		if action == "invite_to_room" {
			go c.XMPPClient.Send(xmppMessageInviteToRoom(c, msg))
		}
	}
}

func xmppMessageSubscribe(c *Client, msg IncommingMessage) stanza.Presence {
	to, ok := msg.Payload["to"].(string)
	if !ok {
		log.Println("unable to parse \"to\" payload")
	}
	m := stanza.Presence{Attrs: stanza.Attrs{
		To:   to,
		From: c.XMPPClient.Session.BindJid, Type: stanza.PresenceTypeSubscribe},
	}
	return m
}

func xmppMessageSubscribed(c *Client, msg IncommingMessage) stanza.Presence {
	to, ok := msg.Payload["to"].(string)
	if !ok {
		log.Println("unable to parse \"to\" payload")
	}
	m := stanza.Presence{Attrs: stanza.Attrs{
		To: to, From: c.XMPPClient.Session.BindJid, Type: stanza.PresenceTypeSubscribed}}
	return m
}

func generateChatStateNotification(status string) stanza.MsgExtension {
	if status == "active" {
		return stanza.StateActive{}
	}
	if status == "composing" {
		return stanza.StateComposing{}

	}
	if status == "paused" {
		return stanza.StatePaused{}

	}
	if status == "gone" {
		return stanza.StateGone{}

	}
	if status == "inactive" {
		return stanza.StateInactive{}
	}
	return nil
}

type CreateRoomExt struct {
	stanza.MsgExtension
	XMLName xml.Name `xml:"http://jabber.org/protocol/muc x"`
}

// https://xmpp.org/extensions/xep-0045.html#example-153
func xmppMessageCreateRoom(c *Client, msg IncommingMessage) stanza.Presence {
	room_name, ok := msg.Payload["room_name"].(string)
	if !ok {
		log.Println("unable to parse \"room_name\" payload")
	}

	presence := stanza.Presence{
		Attrs: stanza.Attrs{
			From: c.XMPPClient.Session.BindJid,
			To:   fmt.Sprintf("%s@conference.localhost", room_name),
		},
		Extensions: []stanza.PresExtension{
			CreateRoomExt{
				XMLName: xml.Name{
					Space: "http://jabber.org/protocol/muc",
					Local: "x",
				},
			},
		},
	}

	return presence
}

func xmppMessageChatMessage(c *Client, msg IncommingMessage) (stanza.Message, bool) {
	to, ok := msg.Payload["to"].(string)
	if !ok {
		log.Println("unable to parse \"to\" payload")
	}
	m := stanza.Message{
		Attrs: stanza.Attrs{
			To:   to,
			From: c.XMPPClient.Session.BindJid,
			Type: stanza.MessageTypeChat,
		},
	}
	body, body_ok := msg.Payload["body"].(string)
	if body_ok {
		m.Body = body
	}

	status, status_ok := msg.Payload["status"].(string)
	if status_ok {
		st := generateChatStateNotification(status)
		if st != nil {
			m.Extensions = append(m.Extensions, st)
		}
	}
	return m, body_ok || status_ok
}

type InvitationExt struct {
	stanza.MsgExtension
	XMLName  xml.Name `xml:"jabber:x:conference x"`
	Jid      string   `xml:"jid,attr,omitempty"`
	Password string   `xml:"password,attr,omitempty"`
	Reason   string   `xml:"reason,attr,omitempty"`
}

// https://xmpp.org/extensions/xep-0249.html#example-1
func xmppMessageInviteToRoom(c *Client, msg IncommingMessage) stanza.Message {
	to, ok := msg.Payload["to"].(string)
	if !ok {
		log.Println("unable to parse \"to\" payload")
	}
	room_name, ok := msg.Payload["room_name"].(string)
	if !ok {
		log.Println("unable to parse \"to\" payload")
	}
	invEx := InvitationExt{
		XMLName: xml.Name{
			Space: "jabber:x:conference",
			Local: "x",
		},
		Jid:      fmt.Sprintf("%s@conference.localhost", room_name),
		Password: "111", // Only invited members can access room, not via the password.
	}

	message, ok := msg.Payload["message"].(string)
	if !ok {
		log.Println("unable to parse \"to\" payload")
	} else {
		invEx.Reason = message
	}

	m := stanza.Message{
		Attrs: stanza.Attrs{
			From: c.XMPPClient.Session.BindJid,
			To:   to,
		},
		Extensions: []stanza.MsgExtension{invEx},
	}
	return m
}
