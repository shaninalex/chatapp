package api

import (
	"server/app/api/controllers/auth"
	"server/app/api/controllers/profile"

	"github.com/gin-gonic/gin"
)

func InitApi(app *gin.Engine) {
	// public routes
	auth.InitController(app, "api/auth")

	// private routes
	// TODO: require auth middleware
	profile.InitController(app, "api/profile")
}
