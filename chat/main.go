package main

import (
	"chat/pkg/web"
	"strconv"
)

var (
	PORT = "8001" // os.Getenv("PORT")
)

func main() {
	port, err := strconv.Atoi(PORT)
	if err != nil {
		panic(err)
	}

	web.WebSocket(port)
}
