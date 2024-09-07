package ejabberd

import (
	"context"
	"crypto/tls"
	"log"
	"os"
	"server/pkg/database"
	"server/pkg/settings"

	ory "github.com/ory/kratos-client-go"
	"gosrc.io/xmpp"
)

var Api api

type api struct {
	XmppClient *xmpp.Client
	Token      string
	XmppHost   string
	AdminJid   string
}

func Init() api {
	generateAdminToken()

	token, err := database.GetToken(settings.GetString("ejabberd.admin.jid"))
	if err != nil {
		panic(err)
	}

	a := api{
		Token:    token.Token,
		XmppHost: settings.GetString("ejabberd.xmpp_host"),
		AdminJid: settings.GetString("ejabberd.admin.jid"),
	}

	config := &xmpp.Config{
		TransportConfiguration: xmpp.TransportConfiguration{
			Address:   a.XmppHost,
			TLSConfig: &tls.Config{InsecureSkipVerify: true},
		},
		Jid:          a.AdminJid,
		Credential:   xmpp.OAuthToken(a.Token),
		StreamLogger: os.Stdout,
		Insecure:     true,
	}

	router := xmpp.NewRouter()

	router.HandleFunc("message", a.handleMessage)

	client, err := xmpp.NewClient(config, router, a.errorHandler)
	if err != nil {
		panic(err)
	}

	a.XmppClient = client

	log.Println("Init XMPP")
	return a
}

func (s *api) Listener(client *xmpp.Client) {
	// run xmpp listener
	// If you pass the client to a connection manager, it will handle the reconnect policy
	// for you automatically.
	cm := xmpp.NewStreamManager(client, nil)
	log.Fatal(cm.Run())
}

func (s *api) UpdateToken(user *ory.Identity) {
	log.Println("Update user token")
	s.authToken(user)
}

func (s *api) CreateUser(ctx context.Context, user *ory.Identity) error {
	err := s.register(user)
	if err != nil {
		log.Println("Register:", err)
		return err
	}
	_, err = s.authToken(user)
	if err != nil {
		log.Println("AuthToken:", err)
		return err
	}
	err = s.setVCard(user)
	if err != nil {
		log.Println("SetVCard:", err)
		return err
	}

	err = s.createNode(user)
	if err != nil {
		log.Println("create node:", err)
		return err
	}
	log.Println("Create user")
	return nil
}
