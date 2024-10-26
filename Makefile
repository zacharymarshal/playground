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
install:
	docker compose build

# start - start dev environment
#
# Usage: make start
.PHONY: start
start:
	docker compose up

# go - run go commands
#
# Usage: make go command
# Example: make go run main.go
.PHONY: go
go:
	@docker compose exec go go $(filter-out $@, $(MAKECMDGOALS))

# node - run nodejs commands
#
# Usage: make node command
# Example: make node main.js
.PHONY: node
node:
	@docker compose exec node node $(filter-out $@, $(MAKECMDGOALS))

# ignore any command that is not defined
%:
	@:
