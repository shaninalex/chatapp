package app

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/shaninalex/go-chat/db"
	"github.com/shaninalex/go-chat/utils"
)

type App struct {
	router   *gin.Engine
	database *db.Database
}

func CreateApp(db *db.Database) (*App, error) {

	return &App{
		router:   gin.Default(),
		database: db,
	}, nil
}

func (app *App) Run() {
	app.registerRoutes()
	app.router.Run(":5000")
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
	}
}

func (app *App) getCurrentUser(c *gin.Context) {

	user, exist := c.Get("user")
	if !exist {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Can't get user"})
		return
	}

	c.JSON(http.StatusOK, user)
}

type AuthPayload struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (app *App) createUser(c *gin.Context) {
	var payload AuthPayload
	err := c.ShouldBindJSON(&payload)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := app.database.CreateUser(payload.Email, payload.Password)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}

func (app *App) authUser(c *gin.Context) {
	var payload AuthPayload
	err := c.ShouldBindJSON(&payload)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := app.database.GetUser(payload.Email)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	match, err := utils.ComparePasswordAndHash(payload.Password, user.PasswordHash)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if !match {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Wrong password"})
		return
	}

	token, err := utils.CreateJWT(user.Id, user.Email)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"access_token": token,
	})

}
