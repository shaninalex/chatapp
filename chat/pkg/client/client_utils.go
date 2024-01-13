package client

import (
	"encoding/json"
	"log"

	"gosrc.io/xmpp/stanza"
)

// Get user Xmpp Auth token from ejabberd server
func getUserXMPPAuthToken(jid string) (string, error) {
	// for now this is only for debug.
	return "password", nil
}

func errorHandler(err error) {
	log.Println(err)
}

// Deprecated: It was using only for debug
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

func createSubscribeMessage(p stanza.Presence) ([]byte, error) {
	b, err := json.Marshal(map[string]interface{}{
		"type": "subscribe",
		"from": p.From,
	})
	if err != nil {
		return nil, err
	}
	return b, nil
}
