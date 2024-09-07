package profile

import (
	"net/http"
	"server/pkg/database"
	"server/pkg/domain"
	"server/pkg/kratos"
	"server/pkg/settings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func handleProfile(ctx *gin.Context) {
	id := ctx.Value("userId").(uuid.UUID)
	session, _, err := kratos.Api.GetSession(ctx, ctx.GetHeader("Cookie"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	sessionMap, err := session.ToMap()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	identity, _, err := kratos.Api.GetIdentity(ctx, id.String())
	if err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	identityMap, err := identity.ToMap()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	token, err := database.GetToken(settings.GetJid(identity.Id))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	ctx.JSON(http.StatusOK, domain.NewResponse(gin.H{
		"identity": identityMap,
		"session":  sessionMap,
		"token":    token,
	}, nil, nil))
}
