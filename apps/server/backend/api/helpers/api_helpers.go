package helpers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

// APIResponse is the standard response object. Can contain any kind of json data or errors.
// Messages - is the array of system messages that contain short text message about result of current operation
// Status is a boolean flag that simply highlight a success of current request.
type APIResponse struct {
	Messages []string `json:"messages"`
	Status   bool     `json:"status"`
	Data     any      `json:"data"`
	Error    any      `json:"error"`
}

// SuccessResponse is used for standard application success response
func SuccessResponse(ctx *gin.Context, data any, message ...string) {
	ctx.JSON(http.StatusOK, &APIResponse{
		Messages: message,
		Status:   true,
		Data:     data,
	})
}

// ErrorResponse used for standard application error response
// Error itself in `any` type because errors can be structured like a set of validation errors, or standard error type
func ErrorResponse(ctx *gin.Context, code int, err any, message ...string) {
	var errMessage string
	var errDetails any

	switch v := err.(type) {
	//case []*validators.FormValidationError:
	//	errDetails = err
	//	errMessage = "Validation Error"
	case string:
		// If it's a plain string, use it directly
		errMessage = v
	default:
		// For any other type, use fmt.Sprintf to represent it as a string
		errMessage = fmt.Sprintf("%v", v)
	}

	ctx.JSON(code, &APIResponse{
		Messages: message,
		Status:   false,
		Error: map[string]any{
			"message": errMessage,
			"details": errDetails,
		},
	})
}

//func GetUserID(ctx *gin.Context) uuid.UUID {
//	userId, ok := ctx.Get(base.ContextKeyUserID)
//	if !ok {
//		panic("unauthorized request. Id was not provided")
//	}
//	return userId.(uuid.UUID)
//}
//
//func GetUser(ctx *gin.Context) *ory.Identity {
//	user, ok := ctx.Get(base.ContextKeyUser)
//	if !ok {
//		panic("unauthorized request. Id was not provided")
//	}
//	return user.(*ory.Identity)
//}
//
//func GetSession(ctx *gin.Context) *ory.Session {
//	session, ok := ctx.Get(base.ContextKeySession)
//	if !ok {
//		panic("unauthorized request. Id was not provided")
//	}
//	return session.(*ory.Session)
//}
