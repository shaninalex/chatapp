package router

import (
	"github.com/google/wire"
)

var Wire = wire.NewSet(
	//middlewares.Wire,
	NewBackendRouter,
)
