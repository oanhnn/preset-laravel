# Usage:
# make         # alias to install
# make install # install
# make update  # update
# make build   # build docker image
# make push    # push docker image

.PHONY: install update build push
.DEFAULT: install

install: build_runtime npm_install composer_install
update:  npm_install composer_update
dev:	 dc_up npm_run_watch
build:   clean build_nginx build_php
push:    login_registry push_nginx push_php
clean:   clean_workspace clean_assets
shell:   dc_up dc_shell_php

export VERSION?=develop

DOCKER_IMAGE_NGINX=your-registry/nginx
DOCKER_IMAGE_PHP=your-registry/php

clean_workspace:
	@echo ">>> Clean workspace ..."
	rm -rf bootstrap/cache/*.php
	rm -rf storage/app/public/*
	rm -rf storage/framework/cache/data/*
	rm -rf storage/framework/sessions/*
	rm -rf storage/framework/testing/*
	rm -rf storage/framework/views/*.php
	rm -rf storage/logs/*.log
	rm -rf storage/*.key
	rm -rf coverage
	rm -rf vendor

clean_assets:
	@echo ">>> Clean assets ..."
	rm -rf public/css
	rm -rf public/fonts
	rm -rf public/img
	rm -rf public/js
	rm -rf public/mix-manifest.json

npm_install:
	@echo ">>> Install node modules ..."
	docker run --rm -v $$(pwd):/var/www -w /var/www -u $$(id -u):$$(id -g) node:16-alpine npm install

npm_run_dev: clean_assets
	@echo ">>> Build assets (dev mode) ..."
	docker run --rm -v $$(pwd):/var/www -w /var/www -u $$(id -u):$$(id -g) node:16-alpine npm run dev

npm_run_prod: clean_assets
	@echo ">>> Build assets (prod mode) ..."
	docker run --rm -v $$(pwd):/var/www -w /var/www -u $$(id -u):$$(id -g) node:16-alpine npm run prod

npm_run_watch: clean_assets
	@echo ">>> Build assets and watch ..."
	docker run --rm -v $$(pwd):/var/www -w /var/www -u $$(id -u):$$(id -g) node:16-alpine npm run watch

composer_install:
	@echo ">>> Install vendor ..."
	docker run --rm -v $$(pwd):/var/www -w /var/www -u $$(id -u):$$(id -g) composer:latest install \
		--ignore-platform-reqs \
		--no-interaction \
		--no-progress \
		--no-scripts \
		--optimize-autoloader \
		--prefer-dist

composer_update:
	@echo ">>> Update vendors ..."
	docker run --rm -v $$(pwd):/var/www -w /var/www -u $$(id -u):$$(id -g) composer:latest update \
		--ignore-platform-reqs \
		--no-interaction \
		--no-progress \
		--no-scripts \
		--optimize-autoloader \
		--prefer-dist

build_nginx: npm_run_prod
	@echo ">>> Build NGINX image (${VERSION}) ..."
	docker build \
		--cache-from=${DOCKER_IMAGE_NGINX}:${VERSION} \
		--cache-from=${DOCKER_IMAGE_NGINX}:latest \
		--file docker/nginx/Dockerfile \
		--tag ${DOCKER_IMAGE_NGINX}:${VERSION} \
		--pull --rm .

build_php: clean_workspace npm_run_prod
	@echo ">>> Build PHP image (${VERSION}) ..."
	docker build \
		--cache-from=${DOCKER_IMAGE_PHP}:${VERSION} \
		--cache-from=${DOCKER_IMAGE_PHP}:latest \
		--cache-from=${DOCKER_IMAGE_PHP}:runtime \
		--file docker/php/Dockerfile \
		--target production
		--tag ${DOCKER_IMAGE_PHP}:${VERSION} \
		--rm .

build_runtime: clean_workspace
	@echo ">>> Build PHP image (runtime) ..."
	docker build \
		--file docker/php/Dockerfile \
		--target runtime \
		--tag ${DOCKER_IMAGE_PHP}:runtime \
		--pull --rm .

login_registry:
	@echo ">>> Login registry ..."

push_nginx:
	@echo ">>> Push NGINX image (${VERSION}) ..."
	docker push ${DOCKER_IMAGE_NGINX}:${VERSION}

push_php:
	@echo ">>> Push PHP image (${VERSION}) ..."
	docker push ${DOCKER_IMAGE_PHP}:${VERSION}

dc_up:
	@echo ">>> Run docker stack ..."
	docker-compose up -d

dc_shell_php:
	@echo ">>> Run shell in PHP container ..."
	docker-compose exec -u $$(id -u):$$(id -g) laravel sh
