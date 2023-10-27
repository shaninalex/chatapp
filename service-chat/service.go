package main

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/gorilla/websocket"
	"gosrc.io/xmpp"
	"gosrc.io/xmpp/stanza"
)

type Service struct {
	ConsumeMessage chan *Message
	Conn           *websocket.Conn
	Router         *xmpp.Router
	Client         *xmpp.Client
}

func (serv *Service) Provide() {
	// get messages from web app and send to xmpp
	for {
		_, msg, err := serv.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			break
		}
		message, err := parseMessage(msg)
		if err != nil {
			log.Println(err)
		}
		reply := stanza.Message{
			Attrs: stanza.Attrs{
				To:   message.To,
				Type: stanza.MessageTypeChat,
			},
			Body: message.Body,
		}

		err = serv.Client.Send(reply)
		if err != nil {
			log.Println(err)
		}
	}
}

func (serv *Service) errorHandler(err error) {
	fmt.Println(err.Error())
}

// just transport all incomming messages from xmpp to websocket to frontend
func (serv *Service) handleMessage(s xmpp.Sender, p stanza.Packet) {
	_Msg, _ := json.Marshal(p)
	serv.Conn.WriteMessage(1, _Msg)
}
