package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"gosrc.io/xmpp"
)

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		// TODO: accept origin only from front host
		return true
	},
}

func wshandler(w http.ResponseWriter, r *http.Request, user_id string) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Printf("Failed to set websocket upgrade: %+v", err)
		return
	}

	config := xmpp.Config{
		TransportConfiguration: xmpp.TransportConfiguration{
			Address: "localhost:5222",
		},
		Jid:          fmt.Sprintf("%s@localhost", user_id),
		Credential:   xmpp.Password("f3ffd689-1261-45cb-b3ec-31abfe722446"),
		StreamLogger: os.Stdout,
	}
	router := xmpp.NewRouter()
	router.HandleFunc("message", handleMessage)
	client, err := xmpp.NewClient(&config, router, errorHandler)
	if err != nil {
		log.Fatalf("%+v", err)
	}
	cm := xmpp.NewStreamManager(client, nil)
	log.Fatal(cm.Run())

	for {
		t, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}
		conn.WriteMessage(t, msg)
	}
}

func main() {

	router := gin.Default()
	// database, err := InitDatabaseConnection()
	// if err != nil {
	// 	panic(err)
	// }
	router.GET("/ws", func(c *gin.Context) {
		user_id := c.Request.Header.Get("X-User")
		if user_id == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "user id is empty"})
			return
		}
		wshandler(c.Writer, c.Request, user_id)
	})

	router.Run(":8083")
}
