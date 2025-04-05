// Code generated by Wire. DO NOT EDIT.

//go:generate go run -mod=mod github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package wire

import (
	"github.com/shaninalex/chatapp/apps/server"
	"github.com/shaninalex/chatapp/apps/server/backend"
	"github.com/shaninalex/chatapp/apps/server/backend/api/controllers"
	"github.com/shaninalex/chatapp/apps/server/backend/router"
	"github.com/shaninalex/chatapp/core/base"
	"github.com/shaninalex/chatapp/core/integrations/kratos"
	"github.com/shaninalex/chatapp/core/services"
)

// Injectors from wire.go:

func InitializeEvent(config *base.Config) (*app.App, error) {
	webService := services.NewWebService(config)
	kratosService := kratos.NewKratosService(config)
	iRouter := services.ProvideRouter(webService)
	backendRouter := router.NewBackendRouter(config, iRouter)
	authController := controllers.NewAuthController(kratosService, config, backendRouter)
	controllersControllers := controllers.NewControllers(authController)
	backendBackend := backend.NewBackend(controllersControllers, backendRouter)
	appApp := app.NewApp(config, webService, backendBackend)
	return appApp, nil
}
