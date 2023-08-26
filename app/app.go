package app

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/shaninalex/go-chat/db"
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
	app.router.Use(AuthMiddleware())
	app.router.GET("/api/v1/user", app.getCurrentUser)
	app.router.POST("/api/v1/user", app.createUser)
}

func (app *App) getCurrentUser(c *gin.Context) {

}

type AuthPayload struct {
	Email        string `json:"email"`
	PasswordHash string `json:"password"`
}

func (app *App) createUser(c *gin.Context) {
	var payload AuthPayload
	err := c.ShouldBindJSON(&payload)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := app.database.CreateUser(payload.Email, payload.PasswordHash)
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, user)
}
