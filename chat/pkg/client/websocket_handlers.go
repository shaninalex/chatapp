package client

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/google/uuid"
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
		go c.XMPPClient.Send(m)
	}

	// enerate response
	if msg.Type == stanza.PresenceTypeSubscribe {
		to, ok := msg.Payload["to"].(string)
		if !ok {
			log.Println("unable to parse \"to\" payload")
		}
		m := stanza.Presence{Attrs: stanza.Attrs{
			To: to, From: c.XMPPClient.Session.BindJid, Type: stanza.PresenceTypeSubscribe}}

		go c.XMPPClient.Send(m)
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
			go c.XMPPClient.Send(m)
		}
	}

	if msg.Type == stanza.IQTypeSet {
		action, ok := msg.Payload["action"].(string)
		if !ok {
			log.Println("unable to parse \"action\" payload")
		}
		if action == "create_room" {
			// check is user allwed to create rooms
			room_name, ok := msg.Payload["room_name"].(string)
			if !ok {
				log.Println("unable to parse \"room_name\" payload")
			}

			// unique room id
			// room_id := fmt.Sprintf("%s-%s", room_name, uuid.New().String())

			rawIq := fmt.Sprintf(`<iq type='set' id='%s' to='%s@conference.localhost'>
				<query xmlns='http://jabber.org/protocol/muc#owner'>
				<x xmlns='jabber:x:data' type='submit'>
					<field var='FORM_TYPE' type='hidden'>
						<value>http://jabber.org/protocol/muc#roomconfig</value>
					</field>
					<field var='muc#roomconfig_roomname'>
						<value>%s</value>
					</field>
					<field var='muc#roomconfig_persistentroom'>
						<value>1</value>
					</field>
				</x>
				</query>
			</iq>`, uuid.New().String(), room_name, room_name)
			go c.XMPPClient.SendRaw(rawIq)
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
