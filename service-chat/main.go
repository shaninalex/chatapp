package main

import (
	"crypto/tls"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"gosrc.io/xmpp"
)

var (
	EJABBERD_SERVER   = os.Getenv("EJABBERD_SERVER")
	EJABBERD_DATABASE = os.Getenv("EJABBERD_DATABASE")
	APP_PORT          = os.Getenv("APP_PORT")
)

var wsupgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		// TODO: accept origin only from front host
		return true
	},
}

func WSHandler(w http.ResponseWriter, r *http.Request, user_id string, db *Database) {
	conn, err := wsupgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Printf("Failed to set websocket upgrade: %+v", err)
		return
	}

	token, err := db.getToken(user_id)
	if err != nil {
		log.Fatalf("%+v", err)
	}
	config := xmpp.Config{
		TransportConfiguration: xmpp.TransportConfiguration{
			Address: EJABBERD_SERVER,
		},
		Jid:          fmt.Sprintf("%s@localhost", user_id),
		Credential:   xmpp.Password(token),
		StreamLogger: os.Stdout,
		Insecure:     true,
	}
	config.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	router := xmpp.NewRouter()
	service := &Service{
		ConsumeMessage: make(chan *Message),
		Conn:           conn,
		Router:         router,
	}
	router.HandleFunc("message", service.handleMessage)
	router.HandleFunc("iq", service.handleMessage)
	router.HandleFunc("presence", service.handleMessage)

	client, err := xmpp.NewClient(&config, service.Router, service.errorHandler)
	if err != nil {
		log.Fatalf("%+v", err)
	}
	service.Client = client
	cm := xmpp.NewStreamManager(client, nil)
	go service.Provide()
	log.Fatal(cm.Run())
}

func main() {

	router := gin.Default()
	database, err := InitDatabaseConnection()
	if err != nil {
		panic(err)
	}

	router.GET("/ws", func(c *gin.Context) {
		user_id := c.Request.Header.Get("X-User")
		if user_id == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"message": "user id is empty"})
			return
		}
		WSHandler(c.Writer, c.Request, user_id, database)
	})

	port, err := strconv.Atoi(os.Getenv("APP_PORT"))
	if err != nil {
		panic(err)
	}
	router.Run(fmt.Sprintf(":%d", port))
}
