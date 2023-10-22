package main

import (
	"database/sql"
	"errors"

	"github.com/doug-martin/goqu/v9"
	_ "github.com/lib/pq"
)

type Database struct {
	Connection *sql.DB
}

func InitDatabaseConnection() (*Database, error) {
	db, err := sql.Open("postgres", EJABBERD_DATABASE)
	if err != nil {
		return nil, err
	}
	return &Database{
		Connection: db,
	}, nil
}

func (db *Database) getToken(user_id string) (string, error) {
	// for some reason I can't authenticate user with oath token. So we will use
	// password instead... Less secure...
	sql, _, _ := goqu.From("users").Select("password").Where(goqu.Ex{
		"username": user_id,
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
