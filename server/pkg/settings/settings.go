package settings

import (
	"fmt"
	"log"
	"strings"
	"sync"

	"github.com/spf13/viper"
)

var once sync.Once

type config struct {
	v *viper.Viper
}

var c *config

// InitConfig initializes the configuration singleton
func InitConfig(configPath string) error {
	var err error
	once.Do(func() {
		log.Println("Init config")
		c, err = newConfig(configPath)
	})
	return err
}

// GetConfig returns the singleton configuration instance
func GetConfig() *config {
	return c
}

func newConfig(configPath string) (*config, error) {
	if configPath == "" {
		return nil, fmt.Errorf("config file was path not provided")
	}

	v := viper.New()
	v.SetConfigFile(configPath)
	v.SetConfigType("yaml")

	if err := v.ReadInConfig(); err != nil {
		return nil, fmt.Errorf("error reading config file: %w", err)
	}

	return &config{v: v}, nil
}

// GetInt is return int config value
func GetInt(key string) int {
	return c.v.GetInt(key)
}

// GetString is return string config value
func GetString(key string) string {
	return c.v.GetString(key)
}

// GetList is the settings method that return slice of strings
func GetList(key string) []string {
	return c.v.GetStringSlice(key)
}

// GetOriginsString get slice of origins hosts and concatinate it
// with coma
func GetOriginsString() string {
	return strings.Join(GetList("origins"), ",")
}

// GetKratosRedirectionUrl returns string with url contains redirect url
func GetKratosRedirectionUrl(path string) string {
	return fmt.Sprintf("%s%s", GetString("kratos.url_browser"), path)
}
