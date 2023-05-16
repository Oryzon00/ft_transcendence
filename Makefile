DOCKER-COMPOSE	=	srcs/docker-compose.yml

VOL				=	$(shell docker volume ls --quiet)

all		:	build

build	:
	docker compose -f $(DOCKER-COMPOSE) build

up		:
	docker compose -f $(DOCKER-COMPOSE) up --detach

logs	:
	docker compose -f $(DOCKER-COMPOSE) up

stop	:
	docker compose -f $(DOCKER-COMPOSE) stop

purge	:
	docker system prune --all --force

rmvol	:
	docker volume ls --quiet | xargs --no-run-if-empty docker volume rm --force

clean	:
	make stop
	make purge
	make rmvol

restart	:
	make stop
	make build
	make up

re		:
	make clean
	make build
	make logs


.PHONY:	all, build, up, log, stop, purge, restart, re
