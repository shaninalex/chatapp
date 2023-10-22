package main

import "database/sql"

type Database struct {
	Connection *sql.DB
}
