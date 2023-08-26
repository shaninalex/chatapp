package app

import (
	"github.com/gin-gonic/gin"
	"github.com/shaninalex/go-chat/db"
)

type App struct {
	router   *gin.Engine
	database *db.Database
	Hub      *Hub
}

func CreateApp(db *db.Database) (*App, error) {
	hub := newHub()
	return &App{
		router:   gin.Default(),
		database: db,
		Hub:      hub,
	}, nil
}

func (app *App) Run() {
	app.registerRoutes()
	// go app.Hub.Run()
	app.router.Run("localhost:5000")
}

func (app *App) registerRoutes() {
	api := app.router.Group("/api/v1")
	{
		api.POST("/auth", app.createUser)
		api.POST("/auth/login", app.authUser)
	}

	auth_routes := api.Group("user")
	auth_routes.Use(AuthMiddleware())
	{
		auth_routes.GET("/", app.getCurrentUser) // /api/v1/user
		auth_routes.GET("/logout", app.logoutUser)
	}

	sockets := app.router.Group("/ws")
	sockets.Use(AuthMiddleware())
	{
		sockets.GET("", func(c *gin.Context) {
			user, _ := c.Get("user")
			app.handleWebsockets(app.Hub, user.(db.User), c.Request, c.Writer)
		})
	}
}
