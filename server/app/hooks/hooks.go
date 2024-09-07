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

// NOTE:
// this routes should be accessed only by kratos, since they are
// triggered only by kratos server. Any outer world iteractions
// should be restricted!
func (app *app) setupRoutes() {
	// api versioning prefix ?
	app.router.POST("/hooks/register", app.handleRegister)
	app.router.POST("/hooks/login", app.handleLogin)
}

func (app *app) handleLogin(ctx *gin.Context) {
	var payload domain.RegistrationPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	identity, _, err := kratos.Api.GetIdentity(ctx, payload.UserId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, []string{"error"}, err))
		return
	}

	ejabberd.Api.UpdateToken(identity)
	ctx.JSON(http.StatusOK, domain.NewResponse(nil, []string{"Login completed"}, nil))
}

func (app *app) handleRegister(ctx *gin.Context) {
	var payload domain.RegistrationPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	identity, _, err := kratos.Api.GetIdentity(ctx, payload.UserId)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, []string{"error"}, err))
		return
	}

	ejabberd.Api.CreateUser(ctx, identity)
	ctx.JSON(http.StatusOK, domain.NewResponse(nil, []string{"Successfully registered"}, nil))
}
