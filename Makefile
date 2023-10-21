start:
	docker compose -f ./docker-compose.local.yml up -d --build

down:
	docker compose -f ./docker-compose.local.yml down -v


# TMP
tmp_start:
	docker compose -f ./docker-compose.tmp.yml up -d --build

tmp_down:
	docker compose -f ./docker-compose.tmp.yml down -v

# tmp_clear_volumes:
# 	docker compose -f ./docker-compose.tmp.yml down -v