package main

type TokenObject struct {
	Jid    string `json:"jid"`
	Token  string `json:"token"`
	Scope  string `json:"scope"`
	Expire int64  `json:"expire"`
}

type ResponseMessage struct {
	Status  bool   `json:"status"`
	Message string `json:"message"`
}
