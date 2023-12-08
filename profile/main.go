package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
)

var (
	APP_PORT              = os.Getenv("APP_PORT")
	EJABBERD_DATABASE_URL = os.Getenv("EJABBERD_DATABASE_URL")
	EJABBERD_API_URL      = os.Getenv("EJABBERD_API_URL")
	ADMIN_JID             = os.Getenv("ADMIN_JID")
	ADMIN_PASSWORD        = os.Getenv("ADMIN_PASSWORD")
	DEFAULT_USER_SCOPE    = "sasl_auth;change_room_option;create_room;create_room_with_opts;destroy_room;get_room_affiliation;get_room_affiliations;get_room_history;get_room_occupants;get_room_occupants_number;get_room_options;get_subscribers;send_direct_invitation;set_room_affiliation;subscribe_room;subscribe_room_many;unsubscribe_room"
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
			if err.Error() == "not found" {
				token, err := createNewToken(user_id)
				if err != nil {
					ResponseJson(err.Error(), http.StatusBadRequest, w)
					return
				}
				w.Header().Set("Content-Type", "application/json")
				json.NewEncoder(w).Encode(token)
				return
			}
			ResponseJson(err.Error(), http.StatusBadRequest, w)
			return
		}

		// If expired
		if int64(token.Expire) < time.Now().Unix() {
			token, err := createNewToken(user_id)
			if err != nil {
				ResponseJson(err.Error(), http.StatusBadRequest, w)
				return
			}
			w.Header().Set("Content-Type", "application/json")
			json.NewEncoder(w).Encode(token)
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
