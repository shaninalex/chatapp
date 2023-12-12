package main

type RegistrationPayload struct {
	Traits struct {
		Email string `json:"email"`
		Name  struct {
			First string `json:"first"`
			Last  string `json:"last"`
		} `json:"name"`
		Image string `json:"image"`
	} `json:"traits"`
	UserId string `json:"userId"`
}

type RegistrationEjabberdPayload struct {
	User     string `json:"user"`
	Host     string `json:"host"`
	Password string `json:"password"`
}
