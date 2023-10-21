package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()
	router.GET("/", func(c *gin.Context) {

		user_id := c.Request.Header.Get("X-User")

		c.JSON(http.StatusOK, gin.H{
			"image":    "image url",
			"username": "Test user",
			"user_id":  user_id,
		})
	})

	router.Run(":8082")
}
