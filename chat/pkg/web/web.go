package web

import (
	"chat/pkg/client"
	"fmt"
	"log"
	"net/http"
)

func WebSocket(port int) {
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		user, err := validateRequest(r)
		if err != nil {
			log.Println(err)
			http.Error(w, "Unable to connect.", http.StatusUnauthorized)
			return
		}

		client.ServeWebsocket(user, w, r)
	})

	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		log.Println(err)
	}
}
