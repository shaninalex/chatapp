package ejabberd

import (
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"server/pkg/database"
	"server/pkg/domain"
	"server/pkg/settings"
	"strings"

	"github.com/google/uuid"
	ory "github.com/ory/kratos-client-go"
)

func (s *api) register(user *ory.Identity) error {
	r := fmt.Sprintf(`{"user": %q, "host": %q, "password": %q}`,
		user.Id,
		"localhost",
		// users will never be able to login via password. Only Auth token
		// TODO: human readable username
		uuid.New().String(),
	)
	request, err := http.NewRequest(
		"POST",
		fmt.Sprintf("%s/%s", settings.GetString("ejabberd.http_root"), "api/register"),
		strings.NewReader(r),
	)
	auth := base64.StdEncoding.EncodeToString(
		[]byte(fmt.Sprintf("%s:%s", settings.GetString("ejabberd.admin.jid"), settings.GetString("ejabberd.admin.password"))),
	)
	request.Header.Add("Authorization", fmt.Sprintf("Basic %s", auth))
	if err != nil {
		return err
	}
	client := http.Client{}
	resp, err := client.Do(request)
	if err != nil {
		return err
	}
	defer resp.Body.Close() //nolint:all

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}

	if resp.StatusCode != 200 {
		return errors.New(string(data))
	}

	return nil
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
	vcard := fmt.Sprintf(`<vCard xmlns='vcard-temp'><FN>%s %s</FN><NICKNAME>%s</NICKNAME></vCard>`,
		traits.Name.First,
		traits.Name.Last,
		user.Id, // TODO: nickname - May be add this to the user traits on register?
	)
	return database.Ejabberd.Exec(`INSERT INTO vcard (username, vcard) VALUES (?, ?)`, user.Id, vcard).Error
}

func (s *api) createNode(user *ory.Identity) error {
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
	r := fmt.Sprintf("{\"jid\": \"%s@localhost\", \"ttl\": %d, \"scopes\": \"%s\"}",
		user.Id,
		settings.GetInt("ejabberd.token_life_time"),
		DEFAULT_USER_SCOPE,
	)
	request, err := http.NewRequest(
		"POST",
		fmt.Sprintf("%s/%s", settings.GetString("ejabberd.http_root"), "api/oauth_issue_token"),
		strings.NewReader(r),
	)
	auth := base64.StdEncoding.EncodeToString(
		[]byte(fmt.Sprintf("%s:%s", settings.GetString("ejabberd.admin.jid"), settings.GetString("ejabberd.admin.password"))),
	)
	request.Header.Add("Authorization", fmt.Sprintf("Basic %s", auth))
	if err != nil {
		return nil, err
	}
	client := http.Client{}
	resp, err := client.Do(request)
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

func generateAdminToken() {
	// TODO: check if token exists
	// if exists - do not create new one
	// if exists but expired - recreate
	client := http.Client{}
	r := fmt.Sprintf("{\"jid\": \"%s\", \"ttl\": %d, \"scopes\": \"%s\"}",
		settings.GetString("ejabberd.admin.jid"),
		3600,
		ADMIN_SCOPE,
	)
	request, err := http.NewRequest(
		"POST",
		fmt.Sprintf("%s/%s", settings.GetString("ejabberd.http_root"), "api/oauth_issue_token"),
		strings.NewReader(r),
	)
	auth := base64.StdEncoding.EncodeToString(
		[]byte(fmt.Sprintf("%s:%s", settings.GetString("ejabberd.admin.jid"), settings.GetString("ejabberd.admin.password"))),
	)
	request.Header.Add("Authorization", fmt.Sprintf("Basic %s", auth))
	if err != nil {
		panic(err)
	}

	resp, err := client.Do(request)
	if err != nil {
		log.Println(err)
		panic(errors.New("unable to generate admin token"))
	}
	defer resp.Body.Close() //nolint:all

	if resp.StatusCode != 200 {
		panic(errors.New("unable to generate admin token (received not 200 response code)"))
	}

	log.Println("token created")
}
