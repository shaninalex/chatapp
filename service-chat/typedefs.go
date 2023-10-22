package main

type RegistrationPayload struct {
	Traits struct {
		Email string `json:"email"`
		Name  struct {
			First string `json:"first"`
			Last  string `json:"last"`
		} `json:"name"`
	} `json:"traits"`
	UserId string `json:"userId"`
}

type RegistrationEjabberdPayload struct {
	User     string `json:"user"`
	Host     string `json:"host"`
	Password string `json:"password"`
}

type Message struct {
	From string `json:"from"`
	To   string `json:"to,omitempty"`
	Body string `json:"body,omitempty"`
	Type string `json:"type,omitempty"`
}
