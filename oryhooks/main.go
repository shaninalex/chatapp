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
			c.JSON(http.StatusBadRequest, gin.H{
				"error":   true,
				"message": err.Error(),
			})
			return
		}

		// create ejabberd user
		err = oryHooks.Register(&payload)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{
				"error":   true,
				"message": err.Error(),
			})
			return
		}

		// create Auth Token
		err = oryHooks.AuthToken(&payload)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{
				"error":   true,
				"message": err.Error(),
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"error":   false,
			"message": fmt.Sprintf("Created chat user for %s", payload.Email),
		})
	})

	router.Run(fmt.Sprintf(":%d", port))
}
