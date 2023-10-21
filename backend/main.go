package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"gosrc.io/xmpp"
)

type RegistrationPayload struct {
	Email string `json:"email"`
	Name  struct {
		First string `json:"first"`
		Last  string `json:"last"`
	} `json:"name"`
	UserId string `json:"userId"`
}

func main() {

	router := gin.Default()

	router.POST("/ory-hooks/register", func(c *gin.Context) {
		var payload RegistrationPayload
		err := c.ShouldBindJSON(&payload)
		if err != nil {
			log.Println(err)
		}

		config := xmpp.Config{
			TransportConfiguration: xmpp.TransportConfiguration{
				Address: "localhost:5222",
			},
			Jid:          "admin@localhost",
			Credential:   xmpp.Password("password"),
			StreamLogger: os.Stdout,
		}

		router := xmpp.NewRouter()
		client, err := xmpp.NewClient(&config, router, nil)
		if err != nil {
			log.Fatalf("%+v", err)
		}

		log.Println(client)

		// TODO: create ejabberd user
		// TODO: create Auth Token
		c.JSON(http.StatusOK, nil)
	})

	router.Run(":8081")
}
