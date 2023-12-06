package main

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strings"
)

func ResponseJson(message string, code int, w http.ResponseWriter) {
	resp := &ResponseMessage{
		Status:  true,
		Message: message,
	}
	if code >= 400 {
		resp.Status = false
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(resp)
}

func createNewToken(user_id string) (*TokenObject, error) {
	payload := strings.NewReader(
		fmt.Sprintf(`{"jid": "%s@localhost", "ttl": %d, "scopes": "%s"}`,
			user_id,
			3600,
			DEFAULT_USER_SCOPE,
		),
	)

	client := http.Client{}
	request, err := http.NewRequest("POST", fmt.Sprintf("%s/api/oauth_issue_token", EJABBERD_API_URL), payload)
	auth := base64.StdEncoding.EncodeToString([]byte(fmt.Sprintf("%s:%s", ADMIN_JID, ADMIN_PASSWORD)))
	request.Header.Add("Authorization", fmt.Sprintf("Basic %s", auth))
	if err != nil {
		return nil, err
	}
	resp, err := client.Do(request)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	if resp.StatusCode != 200 {
		return nil, errors.New(string(data))
	}
	var token TokenObject
	err = json.Unmarshal(data, &token)
	token.Jid = fmt.Sprintf("%s@localhost", user_id)
	return &token, nil
}
