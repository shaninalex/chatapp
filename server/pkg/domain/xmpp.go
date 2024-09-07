package domain

// Ref: https://docs.ejabberd.im/developer/ejabberd-api/admin-api/#oauth_issue_token
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
// https://docs.ejabberd.im/developer/ejabberd-api/admin-api/#subscribe_room
type SubscribeRoom struct {
	User  string   `json:"user"`
	Nick  string   `json:"nick"`
	Room  string   `json:"room"`
	Nodes []string `json:"nodes"`
}
