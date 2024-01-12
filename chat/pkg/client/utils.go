package client

import (
	"encoding/json"
	"log"

	"gosrc.io/xmpp/stanza"
)

// Get user Xmpp Auth token from ejabberd server
func getUserXMPPAuthToken(jid string) (string, error) {

	return "password", nil
}

func errorHandler(err error) {
	log.Println(err)
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
