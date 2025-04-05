package base

import (
	"fmt"
	"os"
	"time"

	"github.com/spf13/viper"
)

func NewConfig(path string) *Config {
	conf := &Config{}
	conf.path = path
	conf.init()
	return conf
}

type Config struct {
	path      string
	v         *viper.Viper
	startTime time.Time
}

func (s *Config) init() {
	s.startTime = time.Now()
	s.v = viper.New()
	s.ReadConfig(s.path)
}

func (s *Config) ReadConfig(path string) {
	s.v.AddConfigPath(path)
	s.v.SetConfigType("yaml")
	s.v.SetConfigName(s.Env())

	err := s.v.ReadInConfig()

	if err != nil { // Handle errors reading the config file
		panic(fmt.Errorf("Can't open config file. %w \n", err))
	}
}

const ENV_PRODUCTION = "production"
const ENV_STAGING = "staging"
const ENV_DEVELOPMENT = "development"
const ENV_TESTING = "testing"
const ENV_DOCKER = "docker"
const NODE_DEV = "dev"

func (s *Config) Env() string {
	if os.Getenv("APPLICATION_ENV") != "" {
		return os.Getenv("APPLICATION_ENV")
	}
	return ENV_DEVELOPMENT
}

func (s *Config) String(param string) string {
	return s.v.GetString(param)
}

func (s *Config) Int(param string) int {
	return s.v.GetInt(param)
}

func (s *Config) List(param string) []string {
	return s.v.GetStringSlice(param)
}
