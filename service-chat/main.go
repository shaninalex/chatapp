package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"gosrc.io/xmpp"
	"gosrc.io/xmpp/stanza"
)

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func wshandler(w http.ResponseWriter, r *http.Request) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Printf("Failed to set websocket upgrade: %+v", err)
		return
	}

	for {
		t, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}
		conn.WriteMessage(t, msg)
	}
}

func errorHandler(err error) {
	fmt.Println(err.Error())
}

func handleMessage(s xmpp.Sender, p stanza.Packet) {
	msg, ok := p.(stanza.Message)
	if !ok {
		_, _ = fmt.Fprintf(os.Stdout, "Ignoring packet: %T\n", p)
		return
	}

	_, _ = fmt.Fprintf(os.Stdout, "Body = %s - from = %s\n", msg.Body, msg.From)
}

func main() {

	router := gin.Default()
	database, err := InitDatabaseConnection()
	if err != nil {
		panic(err)
	}
	port, err := strconv.Atoi(os.Getenv("APP_PORT"))
	if err != nil {
		panic(err)
	}

	router.GET("/ws", func(c *gin.Context) {
		user_id := c.Request.Header.Get("X-User")
		if user_id == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "user id is empty"})
			return
		}
		token, err := database.getToken(user_id)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
			return
		}

		config := xmpp.Config{
			TransportConfiguration: xmpp.TransportConfiguration{
				Address: "localhost:5222",
			},
			Jid:          fmt.Sprintf("%s@localhost", user_id),
			Credential:   xmpp.Password(token),
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

		// c.JSON(http.StatusOK, gin.H{"authToken": token})
		wshandler(c.Writer, c.Request)
	})

	router.Run(fmt.Sprintf(":%d", port))
}
