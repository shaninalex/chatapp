start:
	docker compose -f docker-compose.dev.yml up -d --build

down:
	docker compose -f docker-compose.dev.yml down

clear:
	docker compose -f docker-compose.dev.yml down -v


# DATABASE MIGRATIONS
# Used tool: https://github.com/golang-migrate/migrate

# usage:
# 	make migrate_new name=test - create migration called "<time in "20060102150405" format>_test.(up/down).sql
migrate_new:
	~/go/bin/migrate create -ext sql -dir ./database/migrations -format "20060102150405" $(name)

# usage:
# 	make migrate_up
migrate_up:
	~/go/bin/migrate \
		-path ./database/migrations/ \
		-database "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable" \
		-verbose up

# usage:
# 	make migrate_down N=1 - for one migration down
migrate_down:
	~/go/bin/migrate \
		-path ./database/migrations/ \
		-database "postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable" \
		-verbose down $(N)