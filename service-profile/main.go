package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()
	router.GET("/profile", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"image":    "image url",
			"username": "Test user",
		})
	})

	router.Run(":8082")
}
