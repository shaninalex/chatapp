package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	ory "github.com/ory/kratos-client-go"
)

var (
	APP_PORT              = os.Getenv("APP_PORT")
	EJABBERD_DATABASE_URL = os.Getenv("EJABBERD_DATABASE_URL")
	EJABBERD_API_URL      = os.Getenv("EJABBERD_API_URL")
	ADMIN_JID             = os.Getenv("ADMIN_JID")
	ADMIN_PASSWORD        = os.Getenv("ADMIN_PASSWORD")
	DEFAULT_USER_SCOPE    = "sasl_auth;change_room_option;create_room;create_room_with_opts;destroy_room;get_room_affiliation;get_room_affiliations;get_room_history;get_room_occupants;get_room_occupants_number;get_room_options;get_subscribers;send_direct_invitation;set_room_affiliation;subscribe_room;subscribe_room_many;unsubscribe_room"
	KRATOS_URL            = os.Getenv("KRATOS_URL")
)

func main() {

	ctx := context.TODO()

	port, err := strconv.Atoi(APP_PORT)
	if err != nil {
		panic(err)
	}

	DB, err := InitializeDatabase(EJABBERD_DATABASE_URL)
	if err != nil {
		panic(err)
	}

	defer DB.conn.Close()

	configuration := ory.NewConfiguration()
	configuration.Servers = []ory.ServerConfiguration{{URL: KRATOS_URL}}
	client := ory.NewAPIClient(configuration)

	http.HandleFunc("/obtain-token", func(w http.ResponseWriter, r *http.Request) {
		user_id := r.Header.Get("X-User")
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

	http.HandleFunc("/people-list", func(w http.ResponseWriter, r *http.Request) {
		_, resp, err := client.IdentityApi.ListIdentities(ctx).Execute()
		if err != nil {
			ResponseJson(err.Error(), http.StatusBadRequest, w)
			return
		}
		w.WriteHeader(resp.StatusCode)
		w.Header().Set("Content-Type", "application/json")
		for key, values := range resp.Header {
			for _, value := range values {
				w.Header().Set(key, value)
			}
		}
		body, err := io.ReadAll(resp.Body)
		if err != nil {
			ResponseJson(err.Error(), http.StatusBadRequest, w)
			return
		}
		w.Write(body)
	})

	fmt.Printf("Starting server at port 8080\n")
	if err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil); err != nil {
		log.Fatal(err)
	}
}
