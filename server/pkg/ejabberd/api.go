package ejabberd

import (
	"context"
	"crypto/tls"
	"fmt"
	"log"
	"os"
	"server/pkg/domain"
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
	a := api{
		XmppHost: settings.GetString("ejabberd.xmpp_host"),
		AdminJid: settings.GetString("ejabberd.admin.jid"),
	}

	token, err := a.generateAdminToken()
	if err != nil {
		panic(err)
	}

	a.Token = token.Token
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

func (s *api) Listener() {
	// run xmpp listener
	// If you pass the client to a connection manager, it will handle the reconnect policy
	// for you automatically.
	cm := xmpp.NewStreamManager(s.XmppClient, nil)
	log.Fatal(cm.Run())
}

func (s *api) UpdateToken(user *ory.Identity) {
	log.Println("Update user token")
	s.authToken(user)
}

func (s *api) CreateUser(ctx context.Context, user *ory.Identity) error {

	// register new ejabberd user
	err := s.register(user)
	if err != nil {
		log.Println("Register:", err)
		return err
	}

	// Create ejabberd user auth token
	_, err = s.authToken(user)
	if err != nil {
		log.Println("AuthToken:", err)
		return err
	}

	// set ejabberd user VCard
	err = s.setVCard(user)
	if err != nil {
		log.Println("SetVCard:", err)
		return err
	}

	// personal user notification node
	err = s.createNode(user)
	if err != nil {
		log.Println("create node:", err)
		return err
	}

	log.Println("Create user successfull")
	return nil
}

func (s *api) CreateLobby() error {
	room := domain.MucCreateRoom{
		Name:    "lobby",
		Service: fmt.Sprintf("conference.%s", settings.GetString("ejabberd.domain")),
		Host:    settings.GetString("ejabberd.domain"),
		Options: []domain.MucCreateRoomOption{
			{Name: "members_only", Value: "false"},
			{Name: "affiliations", Value: fmt.Sprintf("owner:%s", settings.GetString("ejabberd.admin.jid"))},
			{Name: "persistent", Value: "true"},
			{Name: "allow_change_subj", Value: "false"},
		},
	}

	url := fmt.Sprintf("%s/api/create_room_with_opts", settings.GetString("ejabberd.http_root"))
	_, err := s.makeAdminRequest(room, url)
	return err
}
