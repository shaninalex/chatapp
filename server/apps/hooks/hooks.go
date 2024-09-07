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
	// err := database.InitDatabase()
	// if err != nil {
	// 	panic(err)
	// }

	// err = ejabberd.InitDatabase()
	// if err != nil {
	// 	panic(err)
	// }

	application := &app{
		router: e,
	}

	application.setupRoutes()
}

func (app *app) setupRoutes() {
	app.router.GET("/status", app.handlerStatus)
	app.router.POST("/ory-hooks/register", app.handleRegister)
	app.router.POST("/ory-hooks/login", app.handleLogin)
}

func (app *app) handlerStatus(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}

func (app *app) handleLogin(ctx *gin.Context) {
	var payload domain.RegistrationPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	ejabberd.Api.UpdateToken(&payload)
	ctx.JSON(http.StatusOK, domain.NewResponse(nil, []string{"Login completed"}, nil))
}

func (app *app) handleRegister(ctx *gin.Context) {
	var payload domain.RegistrationPayload
	if err := ctx.ShouldBindJSON(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	// user, err := repositories.UserCreate(database.GetDB(), &payload)
	// if err != nil {
	// 	ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
	// 	return
	// }
	//
	// go func() {
	// 	app.xmppUserAndVCard(&payload, user)
	// }()
	user := kratos.EmptyUser()
	ejabberd.Api.CreateUser(&payload, user)
	ctx.JSON(http.StatusOK, domain.NewResponse(nil, []string{"Successfully registered"}, nil))
}
