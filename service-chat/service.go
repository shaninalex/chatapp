package main

import (
	"fmt"
	"log"
	"os"

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
	// get messages from xmpp and send to web app
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

func (serv *Service) handleMessage(s xmpp.Sender, p stanza.Packet) {
	msg, ok := p.(stanza.Message)
	if !ok {
		_, _ = fmt.Fprintf(os.Stdout, "Ignoring packet: %T\n", p)
		return
	}

	encodedMsg, err := encodeMessage(msg.From, msg.Body)
	if err != nil {
		log.Println(err)
	}
	serv.Conn.WriteMessage(1, encodedMsg)
}
