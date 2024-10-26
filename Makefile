MAKEFLAGS += --no-print-directory

# help - show help message
.PHONY: help
help:
	@echo "Usage: make [target]"
	@sed -n -E 's/^# ([^ ]*) - (.*)$$/  \1: \2/p' ${MAKEFILE_LIST}

# install - setup dev environment
#
# Usage: make install
.PHONY: install
_install:
	docker compose build

# start - start dev environment
#
# Usage: make start
.PHONY: start
_start:
	docker compose up

# go - run go commands
#
# Usage: make go [command]
# Example: make go run main.go
.PHONY: go
go:
	@docker compose exec go go $(filter-out $@, $(MAKECMDGOALS))

# node - run nodejs commands
#
# Usage: make node [command]
# Example: make node main.js
.PHONY: node
node:
	@docker compose exec node node $(filter-out $@, $(MAKECMDGOALS))

# php - run php commands
#
# Usage: make php [command]
# Example: make php index.php
.PHONY: php
php:
	@docker compose exec php php $(filter-out $@, $(MAKECMDGOALS))

# php-composer - run composer commands
#
# Usage: make php-composer [command]
# Example: make php-composer install
.PHONY: php-composer
php-composer:
	docker compose exec php composer $(filter-out $@, $(MAKECMDGOALS))

# php-server - run php server
#
# This will start a php server on the DOCKER_PHP_PUBLIC_PORT in the .env and load from the
# langs/php/public directory
# Usage: make php-server
# Example: make php-server
.PHONY: php-server
php-server:
	docker compose exec php php -S 0.0.0.0:80 -t public/

# ignore any command that is not defined
%:
	@:
