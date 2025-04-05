package integrations

import (
	"github.com/google/wire"
	"github.com/shaninalex/chatapp/core/integrations/kratos"
)

var Wire = wire.NewSet(
	kratos.Wire,

	NewIntegrations,
)

func NewIntegrations(
	kratos *kratos.Kratos,
) *Integrations {
	return &Integrations{
		kratos: kratos,
	}
}

type Integrations struct {
	kratos *kratos.Kratos
}
