package main

import (
	"github.com/shaninalex/go-chat/app"
	"github.com/shaninalex/go-chat/db"
)

func main() {

	database, err := db.CreateConnection("postgres://user:password@localhost:5432/chat?sslmode=disable")

	if err != nil {
		panic(err)
	}

	app, err := app.CreateApp(database)
	if err != nil {
		panic(err)
	}

	app.Run()
}
