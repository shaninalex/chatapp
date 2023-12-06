package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
)

var (
	APP_PORT              = os.Getenv("APP_PORT")
	EJABBERD_DATABASE_URL = os.Getenv("EJABBERD_DATABASE_URL")
	EJABBERD_API_URL      = os.Getenv("EJABBERD_API_URL")
)

func main() {

	port, err := strconv.Atoi(APP_PORT)
	if err != nil {
		panic(err)
	}

	DB, err := InitializeDatabase(EJABBERD_DATABASE_URL)
	if err != nil {
		panic(err)
	}

	defer DB.conn.Close()

	http.HandleFunc("/obtain-token", func(w http.ResponseWriter, r *http.Request) {
		user_id := r.Header.Get("X-User")
		log.Println(user_id)
		if user_id == "" {
			ResponseJson("User id should not be empty", http.StatusBadRequest, w)
			return
		}
		token, err := DB.GetAuthTokenByUser(user_id)
		if err != nil {
			ResponseJson(err.Error(), http.StatusBadRequest, w)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(token)
	})

	fmt.Printf("Starting server at port 8080\n")
	if err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil); err != nil {
		log.Fatal(err)
	}
}
