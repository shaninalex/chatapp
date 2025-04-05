//go:build wireinject
// +build wireinject

package wire

// go:build wireinject
import (
	"github.com/google/wire"
	app "github.com/shaninalex/chatapp/apps/server"
	"github.com/shaninalex/chatapp/core/base"
)

func InitializeEvent(
	config *base.Config,
) (*app.App, error) {
	panic(wire.Build(
		app.Wire,
	))
}
