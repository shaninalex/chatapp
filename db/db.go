package db

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
	"github.com/shaninalex/go-chat/utils"

	"github.com/doug-martin/goqu/v9"
)

type User struct {
	Id           int64  `json:"id" db:"id"`
	Email        string `json:"email" db:"email" binding:"required"`
	PasswordHash string `json:"-" db:"password_hash" binding:"required"`
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

func (database *Database) CreateUser(email, password string) (*User, error) {

	hashed_password, err := utils.GenerateFromPassword(password)
	ds := goqu.Insert("users").Rows(
		goqu.Record{"email": email, "password_hash": hashed_password},
	).Returning("id")
	insertSQL, _, _ := ds.ToSQL()

	var user_id int64
	err = database.DB.QueryRow(insertSQL).Scan(&user_id)
	if err != nil {
		return nil, err
	}

	return &User{
		Id:    user_id,
		Email: email,
	}, nil
}

func (database *Database) GetUser(email string) (*User, error) {

	query := goqu.From("users").Select("id", "email", "password_hash").Where(
		goqu.C("email").Eq(email),
	)
	selectQuery, _, _ := query.ToSQL()
	var user User

	err := database.DB.QueryRow(selectQuery).Scan(
		&user.Id, &user.Email, &user.PasswordHash,
	)

	if err != nil {
		log.Println(err)
		return nil, err
	}

	return &user, nil
}
