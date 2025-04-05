package wire

import (
	app "github.com/shaninalex/chatapp/apps/server"
	"github.com/shaninalex/chatapp/core/base"
	"os"
)

func InitApp() *app.App {
	projectRoot, err := os.Getwd()
	if err != nil {
		panic(err)
	}
	configPath := projectRoot + "/config/apps/server"

	config := base.NewConfig(configPath)
	app, err := InitializeEvent(config)
	if err != nil {
		panic(err)
	}
	return app
}
