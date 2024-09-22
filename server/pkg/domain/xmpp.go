package domain

// Create oath token
// Docs: https://docs.ejabberd.im/developer/ejabberd-api/admin-api/#oauth_issue_token
type XmppAuthTokenResponse struct {
	Token     string `json:"token"`
	Scopes    string `json:"scopes"`
	ExpiresIn string `json:"expires_in"`
}

type XmppUserToken struct {
	Token  string `json:"token"`
	Expire int64  `json:"expire"`
}

// This data structures used to create room
// Docs: https://docs.ejabberd.im/developer/ejabberd-api/admin-api/#create_room_with_opts
type MucCreateRoomOption struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

type MucCreateRoom struct {
	Name    string                `json:"name"`
	Service string                `json:"service"`
	Host    string                `json:"host"`
	Options []MucCreateRoomOption `json:"options"`
}

// Subscribe user to room
// Docs: https://docs.ejabberd.im/developer/ejabberd-api/admin-api/#subscribe_room
type SubscribeRoom struct {
	User  string   `json:"user"`
	Nick  string   `json:"nick"`
	Room  string   `json:"room"`
	Nodes []string `json:"nodes"`
}

// Change room affiliation
// Docs: https://docs.ejabberd.im/developer/ejabberd-api/admin-api/#set_room_affiliation
type Affiliation string

var (
	AffiliationOwner   Affiliation = "owner"
	AffiliationAdmin   Affiliation = "admin"
	AffiliationMember  Affiliation = "member"
	AffiliationOutcast Affiliation = "outcast"
	AffiliationNone    Affiliation = "none"
)

type ChangeRoomAffiliation struct {
	Name        string      `json:"name"`
	Service     string      `json:"service"`
	JID         string      `json:"jid"`
	Affiliation Affiliation `json:"affiliation"`
}

// Docs: https://docs.ejabberd.im/developer/ejabberd-api/admin-api/#register
type RegisterUser struct {
	User     string `json:"user"`
	Host     string `json:"host"`
	Password string `json:"password"`
}

// Docs: https://docs.ejabberd.im/developer/ejabberd-api/admin-api/#oauth_issue_token
type CreateAuthToken struct {
	Jid    string `json:"jid"`
	Ttl    int    `json:"ttl"`
	Scopes string `json:"scopes"`
}
