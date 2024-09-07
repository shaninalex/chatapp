package ejabberd

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"server/pkg/settings"
)

func (s *api) makeAdminRequest(payload any, url string) error {
	jsonData, err := json.Marshal(payload)
	if err != nil {
		fmt.Println("Error marshaling JSON:", err)
		return nil
	}

	// Create a new HTTP request
	request, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		fmt.Println("Error creating request:", err)
		return nil
	}

	// Set the content type to JSON
	request.Header.Set("Content-Type", "application/json")
	auth := base64.StdEncoding.EncodeToString(
		[]byte(fmt.Sprintf("%s:%s", settings.GetString("ejabberd.admin.jid"), settings.GetString("ejabberd.admin.password"))),
	)
	request.Header.Add("Authorization", fmt.Sprintf("Basic %s", auth))

	// Send the request using http.Client
	client := &http.Client{}
	resp, err := client.Do(request)
	if err != nil {
		fmt.Println("Error sending request:", err)
		return nil
	}
	defer resp.Body.Close()

	return nil
}
