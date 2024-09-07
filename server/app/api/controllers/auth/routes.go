package auth

import "github.com/gin-gonic/gin"

// InitController is responsible for all auhorization, registration,
// verification and recovery requests.
func InitController(app *gin.Engine, apiPrefix string) {
	auth := app.Group(apiPrefix)
	auth.GET("/login", getLoginFlow)
	auth.GET("/registration", getRegistrationFlow)
	auth.GET("/error", getErrorFlow)
	auth.GET("/verification", getVerificationFlow)
	auth.GET("/recovery", getRecoveryFlow)
}
