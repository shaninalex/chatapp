package services

import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/shaninalex/chatapp/core/base"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"
)

func NewWebService(
	config *base.Config,
) *WebService {
	gin.SetMode(gin.DebugMode)
	router := gin.Default()
	router.Use(gin.Recovery())
	s := &WebService{
		config: config,
		router: router,
	}
	s.init()
	return s
}

type WebService struct {
	config *base.Config
	router *gin.Engine
}

func (s *WebService) init() {
}

func (s *WebService) Router() *gin.Engine {
	return s.router
}

func (s *WebService) Run(ctx context.Context) {
	port := s.config.Int("app.port")
	srv := &http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: s.router,
	}
	log.Printf("Run Server on %d ...\n", port)

	go func() {
		// service connections
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Println(err)
		}
	}()
	// Wait for interrupt signal to gracefully shut down the server with
	// a timeout
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit
	log.Printf("Shutdown Server %d ...\n", port)
	ctx, cancel := context.WithTimeout(context.Background(), 120*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		//logger.Ctx(ctx).Fatal().Err(err).Msg("Server Shutdown")
		log.Println(err)

	}
	log.Printf("Server exiting  %d\n", port)
}

// ProvideRouter provides gin router
func ProvideRouter(ws *WebService) gin.IRouter {
	return ws.Router()
}
