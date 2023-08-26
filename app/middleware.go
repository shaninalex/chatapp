package app

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/shaninalex/go-chat/db"
	"github.com/shaninalex/go-chat/utils"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		token, err := c.Cookie("token")
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}

		token_claims, err := utils.ValidateToken(token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			return
		}

		var user db.User
		user.Id = int64(token_claims["sub"].(float64))
		user.Email = token_claims["email"].(string)

		c.Set("user", user)

		c.Next()
	}
}
