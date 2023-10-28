package main

import "gosrc.io/xmpp/stanza"

type MessageType string

const (
	TypeMessage  MessageType = "message"
	TypePresence MessageType = "precense"
	TypeIQ       MessageType = "iq"
	TypeSystem   MessageType = "system"
)

type Message struct {
	Type    MessageType     `json:"type"`
	Payload *stanza.Message `json:"payload"`
}

type MessagePresense struct {
	Type    MessageType      `json:"type"`
	Payload *stanza.Presence `json:"payload"`
}

type MessageIQ struct {
	Type    MessageType       `json:"type"`
	Payload *stanza.IQPayload `json:"payload"`
}

type ContactsList struct {
	Type  MessageType         `json:"type"`
	Items []stanza.RosterItem `json:"items"`
}

type MessageSystem struct {
	Type    MessageType `json:"type"`
	Payload string      `json:"payload"`
}
