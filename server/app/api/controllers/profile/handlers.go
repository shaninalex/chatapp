package profile

import (
	"net/http"
	"server/pkg/domain"
	"server/pkg/ejabberd"
	"server/pkg/kratos"
	"server/pkg/settings"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"

	ory "github.com/ory/kratos-client-go"
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

	token, err := ejabberd.GetToken(settings.GetJid(identity.Id))
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

func handleLogoutLink(ctx *gin.Context) {
	flow, _, err := kratos.Api.CreateLogoutFlow(ctx, ctx.GetHeader("Cookie"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	flowMap, err := flow.ToMap()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	ctx.JSON(http.StatusOK, domain.NewResponse(flowMap, nil, nil))
}

func handleSettings(ctx *gin.Context) {
	flow, _, err := kratos.Api.CreateSettingsFlow(ctx, ctx.GetHeader("Cookie"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	nodes := []ory.UiNode{}
	for _, n := range flow.Ui.Nodes {
		if n.Attributes.UiNodeInputAttributes != nil {
			if n.Attributes.UiNodeInputAttributes.Name == "traits.nickname" {
				n.Attributes.UiNodeInputAttributes.Type = "hidden"
			}
			nodes = append(nodes, n)
		} else {
			nodes = append(nodes, n)
		}
	}

	flow.Ui.Nodes = nodes

	flowMap, err := flow.ToMap()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	ctx.JSON(http.StatusOK, domain.NewResponse(flowMap, nil, nil))

}
