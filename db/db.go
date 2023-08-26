package db

import (
	"database/sql"
	"log"

	"github.com/doug-martin/goqu/v9"
)

type User struct {
	Id           int64  `db:"id"`
	Email        string `db:"email"`
	PasswordHash string `db:"password_hash"`
}

type Database struct {
	DB *sql.DB
}

func CreateConnection(dsn string) (*Database, error) {
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, err
	}
	return &Database{DB: db}, nil
}

func (database *Database) CreateUser(user User) error {

	ds := goqu.Insert("users").Rows(user)
	insertSQL, _, _ := ds.ToSQL()

	result, err := database.DB.Exec(insertSQL)
	if err != nil {
		return nil
	}

	log.Println(result.LastInsertId())
	log.Println(result.RowsAffected())

	return nil
}
