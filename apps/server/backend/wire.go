package backend

import (
	"github.com/google/wire"
	"github.com/shaninalex/chatapp/apps/server/backend/api/controllers"
	"github.com/shaninalex/chatapp/apps/server/backend/router"
)

var Wire = wire.NewSet(
	controllers.Wire,
	router.Wire,

	NewBackend,
)

func NewBackend(
	controllers *controllers.Controllers,
	router *router.BackendRouter,
) *Backend {
	return &Backend{
		controllers: controllers,
		router:      router,
	}
}

type Backend struct {
	controllers *controllers.Controllers
	router      *router.BackendRouter
}
