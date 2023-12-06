package main

import (
	"database/sql"
	"errors"
	"fmt"

	_ "github.com/lib/pq"
)

type Database struct {
	dbUrl string
	conn  *sql.DB
}

func InitializeDatabase(db_url string) (*Database, error) {
	connection, err := sql.Open("postgres", db_url)
	if err != nil {
		return nil, err
	}

	database := &Database{
		dbUrl: db_url,
		conn:  connection,
	}
	return database, nil
}

func (db *Database) GetAuthTokenByUser(user_id string) (*TokenObject, error) {
	rows, err := db.conn.Query(
		`SELECT "token", "jid", "scope", "expire" FROM "oauth_token" WHERE jid=$1 LIMIT 1`,
		fmt.Sprintf("%s@localhost", user_id),
	)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var token TokenObject
	if rows.Next() {
		err = rows.Scan(&token.Token, &token.Jid, &token.Scope, &token.Expire)
		if err != nil {
			return nil, err
		}
	} else {
		// No rows found, return a custom error indicating "not found"
		return nil, errors.New("not found")
	}

	return &token, nil
}
