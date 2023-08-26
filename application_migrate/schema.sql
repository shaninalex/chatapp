CREATE TABLE IF NOT EXISTS "user"
(
    id SERIAL PRIMARY KEY,
    email TEXT,
    password_hash TEXT
);
