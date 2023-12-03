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

	// Always return 200 OK since Kratos does not realy need to handle
	// errors from webhooks
	router.POST("/ory-hooks/register", func(c *gin.Context) {
		var payload RegistrationPayload
		err := c.ShouldBindJSON(&payload)
		if err != nil {
			log.Println(err)
			log.Println(gin.H{
				"error":   true,
				"message": err.Error(),
			})
			c.JSON(http.StatusOK, nil)
		}

		// create ejabberd user
		err = oryHooks.Register(&payload)
		if err != nil {
			log.Println(err)
			log.Println(gin.H{
				"error":   true,
				"message": err.Error(),
			})
			c.JSON(http.StatusOK, nil)
		}

		c.JSON(http.StatusOK, nil)
	})

	router.Run(fmt.Sprintf(":%d", port))
}
