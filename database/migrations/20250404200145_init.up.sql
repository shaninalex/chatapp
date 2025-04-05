CREATE TABLE profile (
    id serial PRIMARY KEY,
    identity_id uuid NOT NULL,

    CONSTRAINT profile_identity_id_fk FOREIGN KEY ( identity_id )
        REFERENCES users.identities (id)
        ON DELETE CASCADE
)