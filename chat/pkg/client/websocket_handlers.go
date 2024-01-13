package client

import (
	"encoding/json"
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
		to, ok := msg.Payload["to"].(string)
		if !ok {
			log.Println("unable to parse \"to\" payload")
		}
		m := stanza.Presence{Attrs: stanza.Attrs{
			To: to, From: c.XMPPClient.Session.BindJid, Type: stanza.PresenceTypeSubscribed}}
		c.XMPPClient.Send(m)
	}

	// enerate response
	if msg.Type == stanza.PresenceTypeSubscribe {
		to, ok := msg.Payload["to"].(string)
		if !ok {
			log.Println("unable to parse \"to\" payload")
		}
		m := stanza.Presence{Attrs: stanza.Attrs{
			To: to, From: c.XMPPClient.Session.BindJid, Type: stanza.PresenceTypeSubscribe}}
		c.XMPPClient.Send(m)
	}

	if msg.Type == stanza.MessageTypeChat {
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

		if body_ok || status_ok {
			c.XMPPClient.Send(m)
		}
	}
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
