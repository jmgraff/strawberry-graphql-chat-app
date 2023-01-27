export HOSTNAME=localhost
export PROD=1

# Run this only once after cloning the repository
setup:
	npm install && cd frontend && npm install

build:
	docker compose build

dev:
	PROD=0 docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up

prod:
	docker compose up -d

down:
	docker compose down

clean:
	sudo rm -rf node_modules frontend/node_modules frontend/build backend/__pycache__

.PHONY: build dev prod down clean
