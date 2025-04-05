package app

import (
	"github.com/google/wire"
	"github.com/shaninalex/chatapp/apps/server/backend"
	"github.com/shaninalex/chatapp/core"
	"github.com/shaninalex/chatapp/core/base"
	"github.com/shaninalex/chatapp/core/services"
)

var Wire = wire.NewSet(
	core.Wire,
	services.Wire,
	backend.Wire,

	NewApp,
)

func NewApp(
	config *base.Config,
	webService *services.WebService,
	backend *backend.Backend,
) *App {
	return &App{
		Backend:    backend,
		Config:     config,
		WebService: webService,
	}
}

type App struct {
	Backend    *backend.Backend
	Config     *base.Config
	WebService *services.WebService
}
