package main

import (
	"encoding/json"
)

func parseMessage(p []byte) (*Message, error) {
	var message Message
	if err := json.Unmarshal(p, &message); err != nil {
		return nil, err
	}
	return &message, nil
}

func encodeMessage(from string, body string) ([]byte, error) {
	message := &Message{
		From: from,
		Body: body,
	}
	msg, err := json.Marshal(message)
	if err != nil {
		return nil, err
	}
	return msg, nil
}
