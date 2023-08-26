package app

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/shaninalex/go-chat/db"
	"github.com/shaninalex/go-chat/utils"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		token := c.Request.Header.Get("Authorization")
		if token == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized 1"})
			return
		}

		token = strings.ReplaceAll(token, "Bearer ", "")

		token_claims, err := utils.ValidateToken(token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized 2"})
			return
		}

		var user db.User
		user.Id = int64(token_claims["sub"].(float64))
		user.Email = token_claims["email"].(string)

		c.Set("user", user)

		c.Next()
	}
}
