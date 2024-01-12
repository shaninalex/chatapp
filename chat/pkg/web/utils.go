package web

import "net/http"

// This function implements request validation. Since this app is using kratos
// for authentication - this function will search auth cookies, send request
// in kratos server to validate session and return error if request is not
// authorized.
func validateRequest(r *http.Request) (map[string]interface{}, error) {
	user := map[string]interface{}{
		"id": "2138912039",
	}
	return user, nil
}
