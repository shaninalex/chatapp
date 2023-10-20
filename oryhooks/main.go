package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()

	router.POST("/ory-hooks/register", func(c *gin.Context) {
		var payload RegistrationPayload
		err := c.ShouldBindJSON(&payload)
		if err != nil {
			log.Println(err)
		}

		// TODO: create ejabberd user

		c.JSON(http.StatusOK, nil)
	})

	router.Run(":8081")
}
