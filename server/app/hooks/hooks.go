package hooks

import (
	"net/http"
	"server/pkg/domain"
	"server/pkg/ejabberd"
	"server/pkg/kratos"

	"github.com/gin-gonic/gin"
)

type app struct {
	router *gin.Engine
}

// InitHooksApp is an ory hooks initializer function
func InitHooksApp(e *gin.Engine) {
	application := &app{
		router: e,
	}
	application.setupRoutes()
}

func (app *app) setupRoutes() {
	// api versioning prefix
	app.router.POST("/hooks/register", app.handleRegister)
	app.router.POST("/hooks/login", app.handleLogin)
}

func (app *app) handleLogin(ctx *gin.Context) {
	var payload domain.RegistrationPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	user := kratos.Api.GetUser(payload.UserId)
	ejabberd.Api.UpdateToken(user)
	ctx.JSON(http.StatusOK, domain.NewResponse(nil, []string{"Login completed"}, nil))
}

func (app *app) handleRegister(ctx *gin.Context) {
	var payload domain.RegistrationPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	user := kratos.Api.GetUser(payload.UserId)

	ejabberd.Api.CreateUser(ctx, user)
	ctx.JSON(http.StatusOK, domain.NewResponse(nil, []string{"Successfully registered"}, nil))
}
