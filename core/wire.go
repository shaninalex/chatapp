package core

import (
	"github.com/google/wire"
	"github.com/shaninalex/chatapp/core/integrations"
)

var Wire = wire.NewSet(
	integrations.Wire,

	NewCore,
)

func NewCore(
	integrations *integrations.Integrations,
) *Core {
	return &Core{
		integrations: integrations,
	}
}

type Core struct {
	integrations *integrations.Integrations
}
