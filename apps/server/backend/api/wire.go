package api

import (
	"github.com/google/wire"
	"github.com/shaninalex/chatapp/apps/server/backend/api/controllers"
)

var Wire = wire.NewSet(
	controllers.NewControllers,

	NewApi,
)

func NewApi(
	controllers *controllers.Controllers,
) *Api {
	return &Api{}
}

type Api struct {
}
