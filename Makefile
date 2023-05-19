DOCKER-COMPOSE	=	srcs/docker-compose.yml

VOL				=	$(shell docker volume ls --quiet)

all		:	logs

build	:
	docker compose -f $(DOCKER-COMPOSE) build

up		:
	docker compose -f $(DOCKER-COMPOSE) up --build --detach

logs	:
	docker compose -f $(DOCKER-COMPOSE) up --build

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
	make logs

re		:
	make clean
	make logs


.PHONY:	all, build, up, log, stop, purge, restart, re
