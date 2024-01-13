package client

import (
	"encoding/json"
	"errors"
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

func createChatMessage(msg stanza.Message) []byte {

	msgStatusType, err := getMessageStatusType(&msg)
	if err != nil {
		log.Println(err)
	}

	messageMap := map[string]interface{}{
		"type": stanza.MessageTypeChat,
		"payload": map[string]interface{}{
			"msgId": msg.Id,
			"from":  msg.From,
		},
	}

	if msgStatusType != nil {
		messageMap["payload"].(map[string]interface{})["status"] = &msgStatusType
	}

	if msg.Body != "" {
		messageMap["payload"].(map[string]interface{})["body"] = msg.Body
	}

	m, err := json.Marshal(messageMap)
	if err != nil {
		return nil
	}
	return m
}

func getMessageStatusType(msg *stanza.Message) (*string, error) {
	if msg.Get(&stanza.StateActive{}) {
		status := "active"
		return &status, nil
	}

	if msg.Get(&stanza.StateComposing{}) {
		status := "composing"
		return &status, nil
	}

	if msg.Get(&stanza.StatePaused{}) {
		status := "paused"
		return &status, nil
	}

	if msg.Get(&stanza.StateGone{}) {
		status := "gone"
		return &status, nil
	}

	if msg.Get(&stanza.StateInactive{}) {
		status := "inactive"
		return &status, nil
	}

	return nil, errors.New("unable to get message type")
}

func createSubscribeMessage(p stanza.Presence) ([]byte, error) {
	b, err := json.Marshal(map[string]interface{}{
		"type": stanza.PresenceTypeSubscribe,
		"payload": map[string]interface{}{
			"from": p.From,
		},
	})
	if err != nil {
		return nil, err
	}
	return b, nil
}
