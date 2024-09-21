package domain

import (
	"encoding/json"
)

// RegistrationPayload is the payload that ory hooks handler catch from kratos
// requests.
type RegistrationPayload struct {
	Traits Traits `json:"traits"`
	UserId string `json:"userId"`
}

// Traits this is kratos user traits object
type Traits struct {
	Email    string `json:"email"`
	Name     Name   `json:"name"`
	Nickname string `json:"nickname"`
	Image    string `json:"image"`
}

func (t *Traits) FromInterface(payload interface{}) error {
	var traits Traits
	data, err := json.Marshal(payload)
	if err != nil {
		return err
	}

	err = json.Unmarshal(data, &traits)
	if err != nil {
		return err
	}

	t.Email = traits.Email
	t.Name = traits.Name
	t.Nickname = traits.Nickname
	t.Image = traits.Image

	return nil
}

func (t *Traits) ToMap() map[string]interface{} {
	traitsMap := make(map[string]interface{})
	traitsMap["nickname"] = t.Nickname
	traitsMap["image"] = t.Image
	traitsMap["email"] = t.Email
	traitsMap["name"] = map[string]interface{}{
		"first": t.Name.First,
		"last":  t.Name.Last,
	}
	return traitsMap
}

// Name this is kratos user name object
type Name struct {
	First string `json:"first"`
	Last  string `json:"last"`
}
