package main

import (
	"flag"
	"fmt"
	"server/app/api"
	"server/app/hooks"
	"server/pkg/database"
	"server/pkg/ejabberd"
	"server/pkg/kratos"
	"server/pkg/settings"

	"github.com/gin-gonic/gin"
)

func main() {
	configPath := flag.String("config", "", "Absolute path for configuration file")
	flagXmppListener := flag.Bool("runXmpp", false, "Run xmpp listener")
	flagCreateLobby := flag.Bool("createLobby", false, "Create lobby")

	flag.Parse()
	err := settings.InitConfig(*configPath)
	if err != nil {
		panic(err)
	}

	database.Ejabberd = database.Connect(settings.GetString("ejabberd.dsn"), "ejabberd")
	database.Kratos = database.Connect(settings.GetString("kratos.dsn"), "kratos")
	kratos.Api = kratos.Init()
	ejabberd.Api = ejabberd.Init()

	if *flagCreateLobby {
		err = ejabberd.Api.CreateLobby()
		if err != nil {
			panic(err)
		}
	}

	// Initialize routers
	// Every module initilize it's own set of routes, some of them can be
	// incapsulated with it's own subrouter
	router := gin.Default()
	hooks.InitHooksApp(router)
	api.InitApi(router)

	if *flagXmppListener {
		go func() {
			ejabberd.Api.Listener()
		}()
	}

	if err = router.Run(fmt.Sprintf(":%d", settings.GetInt("port"))); err != nil {
		panic(err)
	}
}
