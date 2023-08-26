package app

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
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

func (app *App) handleWebsockets(c *gin.Context) {
	token, err := c.Cookie("token")
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	log.Println("Cookie: ", token)
	ws, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	defer ws.Close()


	client := &Client{
		conn: ws,
		send: make(chan []byte, 256),
	}

	// register user in Hub
	// run listeners for clients
	log.Println(client)

	for {
		//read data from ws
		mt, message, err := ws.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		log.Printf("recv: %s", message)

		//write ws data
		err = ws.WriteMessage(mt, message)
		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}
