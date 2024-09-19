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

build_server:
	go build -C ./server/app/ -o ../bin/chat

app: build_server
	./server/bin/chat --config=./server/config.yaml --runXmpp

createLobby: build_server
	./server/bin/chat --config=./server/config.yaml --createLobby