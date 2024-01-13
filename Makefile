build:
	docker compose \
		-f ./docker-compose.local.yml \
		--env-file .env \
		up -d --build

start:
	docker compose \
		-f ./docker-compose.local.yml \
		--env-file .env \
		start

stop:
	docker compose \
		-f ./docker-compose.local.yml \
		--env-file .env \
		stop

clear_volumes:
	docker compose \
		-f ./docker-compose.local.yml \
		--env-file .env \
		down -v

# example usage 
# $ make action service=auth
# output: 
# 	auth
rebuild:
	docker compose --file docker-compose.local.yml up -d --no-deps --build $(service)

create_user_token:
	docker exec -it ejabberdcore /home/ejabberd/bin/ejabberdctl oauth_issue_token $(user)@localhost 3600 ejabberd:admin

create_users:
	docker exec ejabberdcore ./bin/ejabberdctl register bob localhost 111 && \
	docker exec ejabberdcore ./bin/ejabberdctl register alice localhost 111 && \
	docker exec ejabberdcore ./bin/ejabberdctl register jack localhost 111 && \
	docker exec ejabberdcore ./bin/ejabberdctl register cat localhost 111

registered_users:
	docker exec ejabberdcore ./bin/ejabberdctl registered_users localhost

enter_ejabberd:
	docker exec -it ejabberdcore sh

build_for_chat:
	docker compose \
		-f ./docker-compose.chat.yml \
		--env-file .env \
		up -d --build
