package main

import (
	"encoding/json"
	"net/http"
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
