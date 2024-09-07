package main

import (
	"flag"
	"fmt"
	"server/apps/hooks"
	"server/pkg/settings"

	"github.com/gin-gonic/gin"
)

func main() {
	configPath := flag.String("config", "", "Absolute path for configuration file")
	// flagAppAdmin := flag.Bool("admin", false, "Run administration web application")
	// flagAppApi := flag.Bool("api", false, "Run main api application")
	flagAppHooks := flag.Bool("hooks", false, "Run hooks application")
	// flagAppAdminBot := flag.Bool("adminbot", false, "Run administration bot")

	flag.Parse()

	err := settings.InitConfig(*configPath)
	if err != nil {
		panic(err)
	}

	router := gin.Default()

	if *flagAppHooks {
		hooks.InitHooksApp(router)
		if err = router.Run(fmt.Sprintf(":%d", settings.GetInt("hooks.port"))); err != nil {
			panic(err)
		}
	}
}
