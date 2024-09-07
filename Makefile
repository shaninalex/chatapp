# use local .env file
# load .env file on start eny commands in Makefile
# ifneq (,$(wildcard ./.env))
#     include .env
#     export
# endif

start:
	docker compose \
		-f ./docker-compose.yml \
		--env-file .env \
		up -d

stop:
	docker compose \
		-f ./docker-compose.yml \
		--env-file .env \
		stop

clear:
	docker compose \
		-f ./docker-compose.yml \
		--env-file .env \
		down -v

# oathkeeper should be installed localy for local development
# Docs: https://www.ory.sh/docs/oathkeeper/install
oathkeeper:
	oathkeeper serve proxy -c ./config/oathkeeper/oathkeeper.yml

app:
	go run ./server/app/main.go --config=./server/config.yaml

