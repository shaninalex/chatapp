package database

import (
	"log"
	"math"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect(dsn string, dbName string) *gorm.DB {
	var counts int64

	for {
		db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			log.Printf("%s Database not yet ready...", dbName)
			counts++
		} else {
			log.Printf("Connected to %s Database", dbName)

			return db
		}

		if counts > 5 {
			log.Printf("Exceeded maximum retry attempts for database %s connection:", dbName)
			panic(err)
		}

		timeout := time.Duration(math.Pow(float64(counts), 2)) * time.Second
		log.Printf("waiting to retry database connection for %s...", dbName)
		time.Sleep(timeout)
	}
}
