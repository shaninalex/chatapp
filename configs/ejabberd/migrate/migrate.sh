#!/bin/bash

# Get the PostgreSQL database credentials from environment variables
DB_HOST="$DB_HOST"
DB_NAME="$DB_NAME"
DB_USER="$DB_USER"
PGPASSWORD="$PGPASSWORD"

# Path to the SQL migration file
MIGRATION_FILE="./pg.sql"

# Construct the psql command
PSQL_COMMAND="psql -h $DB_HOST -d $DB_NAME -U $DB_USER -W"

# Execute the migration
$PSQL_COMMAND -f $MIGRATION_FILE

