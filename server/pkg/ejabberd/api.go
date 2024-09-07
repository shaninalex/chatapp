package ejabberd

import (
	"log"
	"server/pkg/domain"

	ory "github.com/ory/kratos-client-go"
)

type XmppApi interface {
	UpdateToken(payload *domain.RegistrationPayload)
	CreateUser(payload *domain.RegistrationPayload, user *ory.Identity)
}

var Api api

type api struct{}

func init() {
	log.Println("init xmpp api")
	Api = api{}
}

func (s *api) UpdateToken(payload *domain.RegistrationPayload) {
	log.Println("Update user token")
}

func (s *api) CreateUser(payload *domain.RegistrationPayload, user *ory.Identity) {
	log.Println("Create user")
}
