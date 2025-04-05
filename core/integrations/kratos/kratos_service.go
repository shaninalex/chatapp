package kratos

import (
	"context"
	"github.com/shaninalex/chatapp/core/base"
	"net/http"

	ory "github.com/ory/kratos-client-go"
)

func NewKratosService(
	config *base.Config,
) *KratosService {
	s := &KratosService{
		config: config,
	}
	s.init()
	return s
}

type KratosService struct {
	kratos *ory.APIClient
	config *base.Config
}

func (s *KratosService) init() {
	configuration := ory.NewConfiguration()
	configuration.Servers = []ory.ServerConfiguration{
		{
			URL: s.config.String("kratos.url_browser"),
		},
	}
	s.kratos = ory.NewAPIClient(configuration)
}

func (s *KratosService) Client() *ory.APIClient {
	return s.kratos
}

// GetLoginFlow is the method that return created login flow based on user
// cookies and flow id
func (s *KratosService) GetLoginFlow(ctx context.Context, cookie, flowId string) (*ory.LoginFlow, *http.Response, error) {
	return s.kratos.FrontendAPI.
		GetLoginFlow(ctx).
		Cookie(cookie).
		Id(flowId).
		Execute()
}

// GetRegistrationFlow is the method that return registration flow based on user
// cookies and flow id
func (s *KratosService) GetRegistrationFlow(ctx context.Context, cookie, flowId string) (*ory.RegistrationFlow, *http.Response, error) {
	return s.kratos.FrontendAPI.
		GetRegistrationFlow(ctx).
		Cookie(cookie).
		Id(flowId).
		Execute()
}

// GetErrorFlow is the method that return error flow based on user
// cookies and flow id. ory/kratos store errors in database and user can
// access them via error flow id.
func (s *KratosService) GetErrorFlow(ctx context.Context, errorId string) (*ory.FlowError, *http.Response, error) {
	return s.kratos.FrontendAPI.
		GetFlowError(ctx).
		Id(errorId).
		Execute()
}

// GetVerificationFlow is the method that return verification flow based on user
// cookies and flow id. After registration user can be redirected to the
// verification page where this form should be rendered.
func (s *KratosService) GetVerificationFlow(ctx context.Context, cookie, flowId string) (*ory.VerificationFlow, *http.Response, error) {
	return s.kratos.FrontendAPI.
		GetVerificationFlow(ctx).
		Cookie(cookie).
		Id(flowId).
		Execute()
}

// CreateLogoutFlow is the method that create browser logout flow. This flow
// return logout token and logout url. By following logout id or calling api
// call with logout token - kratos will remove active session from db and user
// will be logged out
func (s *KratosService) CreateLogoutFlow(ctx context.Context, cookie string) (*ory.LogoutFlow, *http.Response, error) {
	return s.kratos.FrontendAPI.
		CreateBrowserLogoutFlow(ctx).
		Cookie(cookie).
		Execute()
}

// CreateSettingsFlow is the method that create user settings flow. This method
// basically says to the system that this user ( by cookie ) want to get his
// settings form to change something about himself.
func (s *KratosService) CreateSettingsFlow(ctx context.Context, cookie string) (*ory.SettingsFlow, *http.Response, error) {
	return s.kratos.FrontendAPI.
		CreateBrowserSettingsFlow(ctx).
		Cookie(cookie).
		Execute()
}

// GetSettingsFlow is the method that return settings flow to user. This object
// contain all editable user profile fields that kratos user have access to.
func (s *KratosService) GetSettingsFlow(ctx context.Context, cookie, flowId string) (*ory.SettingsFlow, *http.Response, error) {
	return s.kratos.FrontendAPI.
		GetSettingsFlow(ctx).
		Cookie(cookie).
		Id(flowId).
		Execute()
}

// GetRecoveryFlow is the method that return account recovery flow
func (s *KratosService) GetRecoveryFlow(ctx context.Context, cookie, flowId string) (*ory.RecoveryFlow, *http.Response, error) {
	return s.kratos.FrontendAPI.
		GetRecoveryFlow(ctx).
		Cookie(cookie).
		Id(flowId).
		Execute()
}

// GetSession is the method that return user session information
func (s *KratosService) GetSession(ctx context.Context, cookie string) (*ory.Session, *http.Response, error) {
	return s.kratos.FrontendAPI.
		ToSession(ctx).
		Cookie(cookie).
		Execute()
}

func (s *KratosService) GetIdentity(ctx context.Context, id string) (*ory.Identity, *http.Response, error) {
	return s.kratos.IdentityAPI.GetIdentity(ctx, id).Execute()
}

func (s *KratosService) UpdateIdentityTraits(ctx context.Context, id string, traits map[string]interface{}) (*ory.Identity, *http.Response, error) {
	payload := ory.UpdateIdentityBody{
		Traits: traits,
	}
	return s.kratos.IdentityAPI.UpdateIdentity(ctx, id).
		UpdateIdentityBody(payload).
		Execute()
}

func ProvideKratosService(ks *KratosService) *KratosService {
	return ks
}
