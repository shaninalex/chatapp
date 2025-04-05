package services

import "github.com/google/wire"

var Wire = wire.NewSet(
	NewWebService,
	ProvideRouter,

	NewServices,
)

func NewServices(
	web *WebService,
) *Services {
	return &Services{
		web: web,
	}
}

type Services struct {
	web *WebService
}
