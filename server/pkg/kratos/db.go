package kratos

import (
	"fmt"
	"log"
	"server/pkg/database"
	"server/pkg/domain"
	"server/pkg/utils"
	"strings"
)

func ValidateNickname(nickname string) bool {
	var count int

	// Get all identitites, and check is there any users with nickname like this
	err := database.Kratos.
		Raw("SELECT count(*) FROM identities WHERE traits->>'nickname' LIKE ?", "%"+nickname+"%").
		Scan(&count).
		Error
	if err != nil {
		log.Println(err)
		return false
	}

	return count > 0
}

func GenerateNickname(traits *domain.Traits) string {
	var nickname string

	for {
		if traits.Name.First != "" && traits.Name.Last != "" {
			return fmt.Sprintf(
				"%s%s%s",
				traits.Name.First,
				traits.Name.Last,
				utils.RundomNumericCode(4),
			)
		} else {
			part := strings.Split(traits.Email, "@")[0]
			nickname = fmt.Sprintf("%s%s", part, utils.RundomNumericCode(4))
		}

		if ValidateNickname(nickname) {
			break
		}

	}
	return nickname
}
