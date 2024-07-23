# Variables
DOCKER_COMPOSE = docker-compose
PROJECT_NAME = tasko

# Targets
.PHONY: build up down logs


build:
	$(DOCKER_COMPOSE) build

up:
	$(DOCKER_COMPOSE) up -d

down:
	$(DOCKER_COMPOSE) down

logs:
	$(DOCKER_COMPOSE) logs -f

restart: down up

api-build:
	$(DOCKER_COMPOSE) build api

api-up:
	$(DOCKER_COMPOSE) up -d api

api-down:
	$(DOCKER_COMPOSE) stop api

api-logs:
	$(DOCKER_COMPOSE) logs -f api


db-up:
	$(DOCKER_COMPOSE) up -d db

db-down:
	$(DOCKER_COMPOSE) stop db

db-logs:
	$(DOCKER_COMPOSE) logs -f db

clean:
	$(DOCKER_COMPOSE) down --volumes --remove-orphans