package controllers

import (
	"github.com/google/wire"
)

var Wire = wire.NewSet(
	NewAuthController,

	NewControllers,
)

func NewControllers(
	auth *AuthController,
) *Controllers {
	s := &Controllers{
		auth: auth,
	}
	return s
}

type Controllers struct {
	auth *AuthController
}
