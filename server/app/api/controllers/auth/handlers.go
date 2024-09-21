package auth

import (
	"errors"
	"net/http"
	"server/pkg/domain"
	"server/pkg/kratos"
	"server/pkg/settings"
	"slices"

	"github.com/gin-gonic/gin"

	ory "github.com/ory/kratos-client-go"
)

func getLoginFlow(ctx *gin.Context) {
	flowId := ctx.Query("flow")
	if flowId == "" {
		ctx.Redirect(http.StatusMovedPermanently, settings.GetKratosRedirectionUrl("/self-service/login/browser"))
		return
	}

	flow, resp, err := kratos.Api.GetLoginFlow(ctx, ctx.GetHeader("Cookie"), flowId)
	if err != nil {
		ctx.JSON(resp.StatusCode, domain.NewResponse(nil, nil, err))
		return
	}
	defer resp.Body.Close() //nolint:all

	data, err := flow.ToMap()
	if err != nil {
		ctx.JSON(resp.StatusCode, domain.NewResponse(nil, nil, err))
		return
	}
	ctx.JSON(resp.StatusCode, domain.NewResponse(data, nil, nil))
}

func getRegistrationFlow(ctx *gin.Context) {
	flowId := ctx.Query("flow")
	if flowId == "" {
		ctx.Redirect(http.StatusMovedPermanently, settings.GetKratosRedirectionUrl("/self-service/registration/browser"))
	}

	flow, resp, err := kratos.Api.GetRegistrationFlow(ctx, ctx.GetHeader("Cookie"), flowId)
	if err != nil {
		ctx.JSON(resp.StatusCode, domain.NewResponse(nil, nil, err))
		return
	}

	defer resp.Body.Close() //nolint:all

	// Current kratos configuration show "traits.image"  and "traits.nickname"
	// on registration this is not needed yeat. So this is dirty trick to
	// remove this field from list of nodes. It should be done via json schema.
	nodes := []ory.UiNode{}
	for _, n := range flow.Ui.Nodes {
		if !slices.Contains([]string{"traits.image", "traits.nickname"}, n.Attributes.UiNodeInputAttributes.Name) {
			nodes = append(nodes, n)
		}
	}
	flow.Ui.Nodes = nodes

	data, err := flow.ToMap()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	ctx.JSON(http.StatusOK, domain.NewResponse(data, nil, nil))
}

func getRecoveryFlow(ctx *gin.Context) {
	flowId := ctx.Query("flow")
	if flowId == "" {
		ctx.Redirect(http.StatusMovedPermanently, settings.GetKratosRedirectionUrl("/self-service/recovery/browser"))
	}

	flow, resp, err := kratos.Api.GetRecoveryFlow(ctx, ctx.GetHeader("Cookie"), flowId)
	if err != nil {
		ctx.JSON(resp.StatusCode, domain.NewResponse(nil, nil, err))
		return
	}

	defer resp.Body.Close() //nolint:all

	data, err := flow.ToMap()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}
	ctx.JSON(http.StatusOK, domain.NewResponse(data, nil, nil))
}

func getErrorFlow(ctx *gin.Context) {
	errorId := ctx.Query("id")
	if errorId == "" {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, errors.New("not errors provided")))
		return
	}

	flow, resp, err := kratos.Api.GetErrorFlow(ctx, errorId)
	if err != nil {
		ctx.JSON(resp.StatusCode, domain.NewResponse(nil, nil, err))
		return
	}

	defer resp.Body.Close() //nolint:all

	data, err := flow.ToMap()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}
	ctx.JSON(resp.StatusCode, domain.NewResponse(data, nil, nil))
}

func getVerificationFlow(ctx *gin.Context) {
	flowId := ctx.Query("flow")
	if flowId == "" {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, errors.New("flow id does not provided")))
		return
	}

	flow, resp, err := kratos.Api.GetVerificationFlow(ctx, ctx.GetHeader("Cookie"), flowId)
	if err != nil {
		ctx.JSON(resp.StatusCode, domain.NewResponse(nil, nil, err))
		return
	}

	defer resp.Body.Close() //nolint:all

	data, err := flow.ToMap()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, domain.NewResponse(nil, nil, err))
		return
	}

	ctx.JSON(resp.StatusCode, domain.NewResponse(data, nil, nil))
}
