package ejabberd

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"server/pkg/database"
	"server/pkg/domain"
	"server/pkg/settings"
	"strings"

	"github.com/google/uuid"
	ory "github.com/ory/kratos-client-go"
)

func (s *api) register(user *ory.Identity) error {
	d := domain.RegisterUser{
		User: user.Id,
		Host: settings.GetString("ejabberd.domain"),
		// users will never be able to login via password. Only Auth token
		Password: uuid.New().String(),
	}

	url := fmt.Sprintf("%s/api/register", settings.GetString("ejabberd.http_root"))
	_, err := s.makeAdminRequest(d, url)
	return err
}

func (s *api) setVCard(user *ory.Identity) error {
	log.Println("Create vCard", user.Id)
	traitsJSON, err := json.Marshal(user.Traits)
	if err != nil {
		return fmt.Errorf("error marshalling traits: %v", err)
	}
	var traits domain.Traits
	if err := json.Unmarshal(traitsJSON, &traits); err != nil {
		return fmt.Errorf("error unmarshalling traits into struct: %v", err)
	}
	nickname := traits.Nickname
	if nickname == "" {
		nickname = user.Id
	}
	vcard := fmt.Sprintf(`<vCard xmlns='vcard-temp'><FN>%s %s</FN><NICKNAME>%s</NICKNAME></vCard>`,
		traits.Name.First,
		traits.Name.Last,
		nickname,
	)
	return database.Ejabberd.Exec(`INSERT INTO vcard (username, vcard) VALUES (?, ?)`, user.Id, vcard).Error
}

func (s *api) createNode(user *ory.Identity) error {
	log.Println("Create node")
	s.createPubsubNode(user.Id)
	s.setAffiliations(user.Id)
	return nil
}

func (s *api) createPubsubNode(name string) {
	template := `<iq type="set" to="pubsub.localhost" id="%s">
    <pubsub xmlns="http://jabber.org/protocol/pubsub">
        <create node="/home/ejabberd/%s/notifications" />
        <configure>
            <x xmlns="jabber:x:data" type="submit">
                <field var="FORM_TYPE" type="hidden">
                    <value>http://jabber.org/protocol/pubsub#node_config</value>
                </field>
                <field var="pubsub#access_model">
                    <value>whitelist</value>
                </field>
                <field var="pubsub#notification_type">
                    <value>normal</value>
                </field>
                <field var="pubsub#max_items">
                    <value>max</value>
                </field>
                <field var="pubsub#item_expire">
                    <value>0</value>
                </field>
            </x>
        </configure>
    </pubsub>
</iq>`
	message := fmt.Sprintf(template, uuid.New().String(), name)
	err := s.XmppClient.SendRaw(message)
	if err != nil {
		log.Println(err)
	}
}

func (s *api) setAffiliations(name string) {
	template := `<iq id="%s" to="pubsub.localhost" type="set">
    <pubsub xmlns="http://jabber.org/protocol/pubsub#owner">
        <affiliations node="/home/ejabberd/%s/notifications">
            <affiliation jid="admin@localhost" affiliation="owner"/>
            <affiliation jid="%s@localhost" affiliation="member"/>
        </affiliations>
    </pubsub>
</iq>`
	message := fmt.Sprintf(template, uuid.New().String(), name, name)
	err := s.XmppClient.SendRaw(message)
	if err != nil {
		log.Println(err)
	}
}

func (s *api) authToken(user *ory.Identity) (*domain.XmppAuthTokenResponse, error) {
	d := domain.CreateAuthToken{
		Jid:    settings.GetJid(user.Id),
		Ttl:    settings.GetInt("ejabberd.token_life_time"),
		Scopes: DEFAULT_USER_SCOPE,
	}
	url := fmt.Sprintf("%s/api/oauth_issue_token", settings.GetString("ejabberd.http_root"))
	resp, err := s.makeAdminRequest(d, url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close() //nolint:all

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != 200 {
		return nil, errors.New(string(data))
	}

	var authToken *domain.XmppAuthTokenResponse
	if err := json.Unmarshal(data, &authToken); err != nil {
		return nil, err
	}
	return authToken, nil
}

func (s *api) generateAdminToken() (*domain.XmppAuthTokenResponse, error) {
	// TODO: check if token exists
	// if exists - do not create new one
	// if exists but expired - recreate
	d := domain.CreateAuthToken{
		Jid:    settings.GetString("ejabberd.admin.jid"),
		Ttl:    settings.GetInt("ejabberd.token_life_time"),
		Scopes: ADMIN_SCOPE,
	}
	url := fmt.Sprintf("%s/api/oauth_issue_token", settings.GetString("ejabberd.http_root"))
	resp, err := s.makeAdminRequest(d, url)
	if err != nil {
		panic(err)
	}

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != 200 {
		return nil, errors.New(string(data))
	}

	var authToken *domain.XmppAuthTokenResponse
	if err := json.Unmarshal(data, &authToken); err != nil {
		return nil, err
	}
	return authToken, nil
}

func (s *api) isNicknameExists(nickname string) bool {
	d := struct {
		User string `json:"user"`
		Host string `json:"host"`
	}{
		User: nickname,
		Host: settings.GetString("ejabberd.domain"),
	}

	url := fmt.Sprintf("%s/api/check_account", settings.GetString("ejabberd.http_root"))
	resp, err := s.makeAdminRequest(d, url)
	if err != nil {
		log.Println(err)
		return false
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Error reading response body:", err)
	}
	resultStr := strings.TrimSpace(string(body))
	switch resultStr {
	case "1":
		return true
	case "0":
		return false
	default:
		return false
	}
}
