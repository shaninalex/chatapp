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
