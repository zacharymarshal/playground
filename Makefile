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
