package main

import "github.com/shaninalex/go-chat/db"

func main() {

	database, err := db.CreateConnection("postgres://user:password@localhost:5432/chat")

	if err != nil {
		panic(err)
	}

	app := app.CreateApp(database)
	app.Run()
}
