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

clear_volumes:
	docker compose \
		-f ./docker-compose.yml \
		--env-file .env \
		down -v
