package api

import (
	"server/app/api/controllers/auth"

	"github.com/gin-gonic/gin"
)

func InitApi(app *gin.Engine) {
	// public routes
	auth.InitController(app, "api/auth")

	// private routes
	// TODO: require auth middleware
}
