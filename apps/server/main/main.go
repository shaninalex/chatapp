package main

import (
	"context"
	"github.com/shaninalex/chatapp/apps/server/wire"
	"os"
)

func main() {
	exitCode := run()
	os.Exit(exitCode)
}

func run() int {
	ctx := context.Background()
	app := wire.InitApp()
	app.WebService.Run(ctx)
	return 0
}
