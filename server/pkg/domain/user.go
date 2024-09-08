package domain

// RegistrationPayload is the payload that ory hooks handler catch from kratos
// requests.
type RegistrationPayload struct {
	Traits Traits `json:"traits"`
	UserId string `json:"userId"`
}

// Traits this is kratos user traits object
type Traits struct {
	Email    string  `json:"email"`
	Name     Name    `json:"name"`
	Nickname *string `json:"nickname"` // can be null if login/register via google
	Image    string  `json:"image"`
}

// Name this is kratos user name object
type Name struct {
	First string `json:"first"`
	Last  string `json:"last"`
}
