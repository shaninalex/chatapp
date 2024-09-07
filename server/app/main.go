package main

import (
	"flag"
	"server/app/hooks"
	"server/pkg/database"
	"server/pkg/ejabberd"
	"server/pkg/kratos"
	"server/pkg/settings"

	"github.com/gin-gonic/gin"
)

func main() {
	configPath := flag.String("config", "", "Absolute path for configuration file")
	flag.Parse()
	err := settings.InitConfig(*configPath)
	if err != nil {
		panic(err)
	}

	database.Ejabberd = database.Connect(settings.GetString("ejabberd.dsn"), "ejabberd")
	database.Kratos = database.Connect(settings.GetString("kratos.dsn"), "kratos")
	kratos.Api = kratos.Init()
	ejabberd.Api = ejabberd.Init()

	router := gin.Default()
	hooks.InitHooksApp(router)

	ejabberd.Api.Listener(ejabberd.Api.XmppClient)

	// if err = router.Run(fmt.Sprintf(":%d", settings.GetInt("port"))); err != nil {
	// 	panic(err)
	// }
}
