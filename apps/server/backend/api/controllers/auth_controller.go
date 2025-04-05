package controllers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/shaninalex/chatapp/apps/server/backend/api/helpers"
	"github.com/shaninalex/chatapp/apps/server/backend/router"
	"github.com/shaninalex/chatapp/core/base"
	"github.com/shaninalex/chatapp/core/integrations/kratos"
	"net/http"
)

func NewAuthController(
	kratosService *kratos.KratosService,
	config *base.Config,
	router *router.BackendRouter,
) *AuthController {
	s := &AuthController{
		kratosService: kratosService,
		config:        config,
		router:        router,
	}
	s.init()
	return s
}

type AuthController struct {
	config        *base.Config
	kratosService *kratos.KratosService
	router        *router.BackendRouter
}

const (
	AuthenticateLoginAction        = "api/public/authenticate/login"
	AuthenticateRegistrationAction = "api/public/authenticate/registration"
	AuthenticateErrorAction        = "api/public/authenticate/error"
	AuthenticateVerificationAction = "api/public/authenticate/verification"
	AuthenticateRecoveryAction     = "api/public/authenticate/recovery"
)

func (s *AuthController) init() {
	r := s.router.Unprotected()
	r.GET(AuthenticateLoginAction, s.LoginAction)
}

func (s *AuthController) LoginAction(ctx *gin.Context) {
	flowId := ctx.Query("flow")
	if flowId == "" {
		ctx.Redirect(http.StatusMovedPermanently, s.getKratosRedirectUrl("/self-service/login/browser"))
		return
	}

	flow, resp, err := s.kratosService.GetLoginFlow(ctx, ctx.GetHeader("Cookie"), flowId)
	if err != nil {
		code := http.StatusBadRequest
		if resp != nil {
			code = resp.StatusCode
		}
		helpers.ErrorResponse(ctx, code, err)
		return
	}
	defer resp.Body.Close() //nolint:all

	data, err := flow.ToMap()
	if err != nil {
		helpers.ErrorResponse(ctx, http.StatusBadRequest, err)
		return
	}

	helpers.SuccessResponse(ctx, data)
}

func (s *AuthController) getKratosRedirectUrl(path string) string {
	return fmt.Sprintf("%s%s", s.config.String("kratos.url_browser"), path)
}
