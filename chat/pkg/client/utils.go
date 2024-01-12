package client

import "log"

// Get user Xmpp Auth token from ejabberd server
func getUserXMPPAuthToken(jid string) (string, error) {

	return "password", nil
}

func errorHandler(err error) {
	log.Println(err)
}
