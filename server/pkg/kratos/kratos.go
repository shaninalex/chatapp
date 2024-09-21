// KratosClient is the wrapper around ory/kratos application.
//
// Ory/kratos provide  easy to use, flow based identity+authorization server
// Kratos Client should have to be initialized once at program start and never
// reinitialized again. To do that we need provide kratos url from
// from settings package
//
// Initialization:
// kratos.InitKratos()
//
// Usage:
// form, resp, err := kratos.CreateSettingsFlow(ctx.Context(), ctx.Get("Cookie"))
// form - is the golang representation of actial form
// resp - *http.Response of request to kratos server
// err - standart error
//
// as an flow base system - kratos often require flowId to get particular flow
// form, resp, err := kratos.GetLoginFlow(ctx.Context(), ctx.Get("Cookie"), flowId)
package kratos

import (
	"context"
	"log"
	"net/http"
	"server/pkg/settings"

	ory "github.com/ory/kratos-client-go"
)

var Api api

type api struct {
	kratos *ory.APIClient
}

// InitKratos is the package initializer. Require kratos url string config
// to be provided from settings
func Init() api {
	configuration := ory.NewConfiguration()
	configuration.Servers = []ory.ServerConfiguration{
		{
			URL: settings.GetString("kratos.url_browser"),
		},
	}
	log.Println("Init kratos")
	return api{
		kratos: ory.NewAPIClient(configuration),
	}
}

// GetLoginFlow is the method that return created login flow based on user
// cookies and flow id
func (api *api) GetLoginFlow(ctx context.Context, cookie, flowId string) (*ory.LoginFlow, *http.Response, error) {
	return api.kratos.FrontendAPI.
		GetLoginFlow(ctx).
		Cookie(cookie).
		Id(flowId).
		Execute()
}

// GetRegistrationFlow is the method that return registration flow based on user
// cookies and flow id
func (api *api) GetRegistrationFlow(ctx context.Context, cookie, flowId string) (*ory.RegistrationFlow, *http.Response, error) {
	return api.kratos.FrontendAPI.
		GetRegistrationFlow(ctx).
		Cookie(cookie).
		Id(flowId).
		Execute()
}

// GetErrorFlow is the method that return error flow based on user
// cookies and flow id. ory/kratos store errors in database and user can
// access them via error flow id.
func (api *api) GetErrorFlow(ctx context.Context, errorId string) (*ory.FlowError, *http.Response, error) {
	return api.kratos.FrontendAPI.
		GetFlowError(ctx).
		Id(errorId).
		Execute()
}

// GetVerificationFlow is the method that return verification flow based on user
// cookies and flow id. After registration user can be redirected to the
// verification page where this form shold be rendered.
func (api *api) GetVerificationFlow(ctx context.Context, cookie, flowId string) (*ory.VerificationFlow, *http.Response, error) {
	return api.kratos.FrontendAPI.
		GetVerificationFlow(ctx).
		Cookie(cookie).
		Id(flowId).
		Execute()
}

// CreateLogoutFlow is the method that create browser logout flow. This flow
// return logout token and logout url. By following logout id or calling api
// call with logout token - kratos will remove active session from db and user
// will be logged out
func (api *api) CreateLogoutFlow(ctx context.Context, cookie string) (*ory.LogoutFlow, *http.Response, error) {
	return api.kratos.FrontendAPI.
		CreateBrowserLogoutFlow(ctx).
		Cookie(cookie).
		Execute()
}

// CreateSettingsFlow is the method that create user settings flow. This method
// basicaly says to the system that this user ( by cookie ) want to get his
// settings form to change some thing about himself.
func (api *api) CreateSettingsFlow(ctx context.Context, cookie string) (*ory.SettingsFlow, *http.Response, error) {
	return api.kratos.FrontendAPI.
		CreateBrowserSettingsFlow(ctx).
		Cookie(cookie).
		Execute()
}

// GetSettingsFlow is the method that return settings flow to user. This object
// contain all editable user profile fields that kratos user have access to.
func (api *api) GetSettingsFlow(ctx context.Context, cookie, flowId string) (*ory.SettingsFlow, *http.Response, error) {
	return api.kratos.FrontendAPI.
		GetSettingsFlow(ctx).
		Cookie(cookie).
		Id(flowId).
		Execute()
}

// GetRecoveryFlow is the method that return account recovery flow
func (api *api) GetRecoveryFlow(ctx context.Context, cookie, flowId string) (*ory.RecoveryFlow, *http.Response, error) {
	return api.kratos.FrontendAPI.
		GetRecoveryFlow(ctx).
		Cookie(cookie).
		Id(flowId).
		Execute()
}

// GetSession is the method that return user session information
func (api *api) GetSession(ctx context.Context, cookie string) (*ory.Session, *http.Response, error) {
	return api.kratos.FrontendAPI.
		ToSession(ctx).
		Cookie(cookie).
		Execute()
}

func (api *api) GetIdentity(ctx context.Context, id string) (*ory.Identity, *http.Response, error) {
	return api.kratos.IdentityAPI.GetIdentity(ctx, id).Execute()
}

func (api *api) UpdateIdentityTraits(ctx context.Context, id string, traits map[string]interface{}) (*ory.Identity, *http.Response, error) {
	payload := ory.UpdateIdentityBody{
		Traits: traits,
	}
	return api.kratos.IdentityAPI.UpdateIdentity(ctx, id).
		UpdateIdentityBody(payload).
		Execute()
}
