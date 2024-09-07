package database

import (
	"log"
	"server/pkg/domain"

	"gorm.io/gorm"
)

var Ejabberd *gorm.DB
var Kratos *gorm.DB

func GetToken(jid string) (*domain.XmppUserToken, error) {
	userToken := &domain.XmppUserToken{}
	err := Ejabberd.
		Raw(`SELECT token, expire FROM oauth_token WHERE jid = ? ORDER BY expire DESC LIMIT 1`, jid).
		Scan(&userToken).Error
	if err != nil {
		log.Println("unable to get auth token", err)
		return nil, err
	}
	return userToken, nil
}
