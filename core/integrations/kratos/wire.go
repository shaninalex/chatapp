package kratos

import (
	"github.com/google/wire"
)

var Wire = wire.NewSet(
	NewKratosService,
	NewKratos,
)

func NewKratos(
	KratosService *KratosService,
) *Kratos {
	return &Kratos{
		KratosService: KratosService,
	}
}

type Kratos struct {
	KratosService *KratosService
}
