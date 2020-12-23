# ========================
# Get backend vendors
# ========================
FROM composer AS vendor

WORKDIR /var/www

COPY composer.* ./
COPY database ./database
RUN composer install  \
    --ignore-platform-reqs \
    --no-dev \
    --no-interaction \
    --no-progress \
    --no-scripts \
    --no-suggest \
    --optimize-autoloader \
    --prefer-dist

# ========================
# Build frontend assets
# ========================
FROM node:12-alpine AS frontend

RUN apk add --update --no-cache git build-base

WORKDIR /var/www

COPY package*.json ./

RUN npm ci --quiet

COPY webpack.mix.js ./
COPY resources      ./resources
COPY public         ./public

RUN set -eux; \
    npm run production

# ========================
# Build app image
# ========================
FROM oanhnn/laravel:1.0

COPY                 .                         /var/wwww
COPY --from=vendor   /var/wwww/vendor          /var/wwww/vendor
COPY --from=frontend /var/wwww/public          /var/wwww/public

RUN set -eux; \
    chown -R www-data:www-data /var/www/app; \
    su-exec www-data php /var/wwww/artisan package:discover; \
    su-exec www-data php /var/wwww/artisan storage:link;
