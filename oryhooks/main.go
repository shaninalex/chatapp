package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()
	oryHooks := InitOryHooks()

	port, err := strconv.Atoi(os.Getenv("APP_PORT"))
	if err != nil {
		log.Println(err)
		return
	}

	router.POST("/ory-hooks/register", func(c *gin.Context) {
		var payload RegistrationPayload
		err := c.ShouldBindJSON(&payload)
		if err != nil {
			log.Println(err)
			return
		}

		// create ejabberd user
		err = oryHooks.Register(&payload)
		if err != nil {
			log.Println(err)
			return
		}

		// create Auth Token
		err = oryHooks.Register(&payload)
		if err != nil {
			log.Println(err)
			return
		}
		c.JSON(http.StatusOK, nil)
	})

	router.Run(fmt.Sprintf(":%d", port))
}
