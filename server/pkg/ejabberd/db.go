package ejabberd

import (
	"log"
	"server/pkg/database"
	"server/pkg/domain"
)

func GetToken(jid string) (*domain.XmppUserToken, error) {
	userToken := &domain.XmppUserToken{}
	err := database.Ejabberd.
		Raw(`SELECT token, expire FROM oauth_token WHERE jid = ? ORDER BY expire DESC LIMIT 1`, jid).
		Scan(&userToken).Error
	if err != nil {
		log.Println("unable to get auth token", err)
		return nil, err
	}
	return userToken, nil
}
