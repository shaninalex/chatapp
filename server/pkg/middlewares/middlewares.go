package middlewares

import (
	"errors"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func XUserMiddleware(ctx *gin.Context) {
	if ctx.GetHeader("X-User") == "" {
		log.Println("XUserMiddleware: ", errors.New("user id was not provided"))
		ctx.Abort()
	}
	id, err := uuid.Parse(ctx.GetHeader("X-User"))
	if err != nil {
		log.Println("XUserMiddleware: ", err)
		ctx.Abort()
	}

	ctx.Set("userId", id)
	ctx.Next()
}
