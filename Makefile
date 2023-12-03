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
