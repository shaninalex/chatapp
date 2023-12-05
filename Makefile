start:
	docker compose \
		-f ./docker-compose.local.yml \
		--env-file .env \
		up -d --build

down:
	docker compose \
		-f ./docker-compose.local.yml \
		--env-file .env \
		down

clear_volumes:
	docker compose \
		-f ./docker-compose.local.yml \
		--env-file .env \
		down -v

restart: down start

# example usage 
# $ make action service=auth
# output: 
# 	auth
rebuild:
	docker compose --file docker-compose.local.yml up -d --no-deps --build $(service)

create_user_token:
	docker exec -it ejabberdcore /home/ejabberd/bin/ejabberdctl oauth_issue_token $(user)@localhost 3600 ejabberd:admin