package app

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/shaninalex/go-chat/db"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

type ChatMessage struct {
	UserId int64  `json:"user_id"`
	Body   string `json:"body"`
}

type UserStatus struct {
	UserId int64 `json:"user_id"`
	Status bool  `json:"status"`
}

type ApplicationMessage struct {
	MessageType string      `json:"message_type"` // "message" | "app"
	ReceiverId  int64       `json:"receiver_id"`
	Content     interface{} `json:"content"` // ChatMessage | UserStatus
}

func (app *App) handleWebsockets(hub *Hub, user db.User, req *http.Request, resp http.ResponseWriter) {
	log.Println(user)
	conn, err := upgrader.Upgrade(resp, req, nil)
	if err != nil {
		log.Println(err)
		return
	}
	client := &Client{
		hub: hub,
		conn: conn,
		send: make(chan []byte, 256),
		user: user,
	}
	client.hub.register <- client
	go client.writePump()
	go client.readPump()
	// token, err := req.Cookie("token")
	// if err != nil {
	// 	log.Print("upgrade:", err)
	// 	return
	// }
	// log.Println("Cookie: ", token)
	//
	// ws, err := upgrader.Upgrade(resp, req, nil)
	// if err != nil {
	// 	log.Print("upgrade:", err)
	// 	return
	// }
	// defer ws.Close()
	//
	// client := &Client{conn: ws, send: make(chan []byte, 256), hub: hub}
	// client.hub.register <- client
	// go client.writePump()
	// go client.readPump()
}
