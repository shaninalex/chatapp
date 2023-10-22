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

	port, err := strconv.Atoi(os.Getenv("APP_PORT"))
	if err != nil {
		log.Println(err)
		return
	}

	// Always return 200 OK since Kratos does not realy need to handle
	// errors from webhooks
	router.GET("/ory-hooks/register", func(c *gin.Context) {
		user_id := c.Request.Header.Get("X-User")

		c.JSON(http.StatusOK, nil)
	})

	router.Run(fmt.Sprintf(":%d", port))
}
