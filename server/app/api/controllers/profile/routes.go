package profile

import (
	"server/pkg/middlewares"

	"github.com/gin-gonic/gin"
)

func InitController(app *gin.Engine, apiPrefix string) {
	profile := app.Group(apiPrefix)
	profile.Use(middlewares.XUserMiddleware)
	profile.GET("/me", handleProfile)
	profile.GET("/logout", handleLogoutLink)
	profile.GET("/settings", handleSettings)
}
