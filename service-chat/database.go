package main

import (
	"database/sql"
	"errors"
	"os"

	"github.com/doug-martin/goqu/v9"
	_ "github.com/lib/pq"
)

type Database struct {
	Connection *sql.DB
}

func InitDatabaseConnection() (*Database, error) {
	db, err := sql.Open("postgres", os.Getenv("EJABBERD_DATABASE"))
	if err != nil {
		return nil, err
	}
	return &Database{
		Connection: db,
	}, nil
}

func (db *Database) getToken(user_id string) (string, error) {
	sql, _, _ := goqu.From("oauth_token").Select("token").Where(goqu.Ex{
		"jid": user_id,
	}).ToSQL()
	var token string
	if err := db.Connection.QueryRow(sql).Scan(&token); err != nil {
		return "", err
	}
	if token == "" {
		return "", errors.New("token not found or invalid")
	}
	return token, nil
}
