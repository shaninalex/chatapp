run:
	@go run .

create_users:
	docker exec ejabberdcore ./bin/ejabberdctl register bob localhost 111 && \
	docker exec ejabberdcore ./bin/ejabberdctl register alice localhost 111 && \
	docker exec ejabberdcore ./bin/ejabberdctl register jack localhost 111 && \
	docker exec ejabberdcore ./bin/ejabberdctl register cat localhost 111

registered_users:
	docker exec ejabberdcore ./bin/ejabberdctl registered_users localhost

