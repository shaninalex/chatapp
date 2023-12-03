package main

type MessageType string

const (
	TypeSystem MessageType = "system"
)

type MessageSystem struct {
	Type    MessageType `json:"type"`
	Payload string      `json:"payload"`
}
