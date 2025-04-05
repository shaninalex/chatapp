package router

import (
	"github.com/gin-gonic/gin"
	"github.com/shaninalex/chatapp/core/base"
)

func NewBackendRouter(
	config *base.Config,
	router gin.IRouter,
	// xuserMiddleware *middlewares.XUserMiddleware,
) *BackendRouter {
	s := &BackendRouter{
		config: config,
		router: router,
		//xuserMiddleware: xuserMiddleware,
	}
	s.init()
	return s
}

type BackendRouter struct {
	config          *base.Config
	router          gin.IRouter
	protectedRouter gin.IRouter
	//xuserMiddleware *middlewares.XUserMiddleware
}

func (s *BackendRouter) init() {
	// Create a new group for protected routes
	s.protectedRouter = s.router.Group("")
	//s.protectedRouter.Use(s.xuserMiddleware.Middleware)
}

func (s *BackendRouter) Unprotected() gin.IRouter {
	return s.router
}

func (s *BackendRouter) Protected() gin.IRouter {
	return s.protectedRouter
}
