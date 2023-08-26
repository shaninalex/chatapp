CREATE TABLE IF NOT EXISTS "users"
(
    id SERIAL,
    email VARCHAR(50) NOT NULL,
    password_hash TEXT NOT NULL,

    UNIQUE(email),
    PRIMARY KEY (id)
);
