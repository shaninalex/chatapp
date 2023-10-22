package main

import (
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
)

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

	router.GET("/connect", func(c *gin.Context) {
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
		c.JSON(http.StatusOK, gin.H{"authToken": token})
	})

	router.Run(fmt.Sprintf(":%d", port))
}
