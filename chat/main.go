package main

import (
	"chat/pkg/web"
	"os"
	"strconv"
)

var (
	PORT          = os.Getenv("PORT")
	EJABBERD_HOST = os.Getenv("EJABBERD_HOST")
)

func main() {
	port, err := strconv.Atoi(PORT)
	if err != nil {
		panic(err)
	}

	web.WebSocket(port)
}
