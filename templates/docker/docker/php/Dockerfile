# docker/dockerfile:1

# ========================
# Runtime
# ========================
FROM oanhnn/php:8.0-fpm-alpine AS runtime

WORKDIR /var/www

COPY --chown=root:root docker/php/start-container  /usr/local/bin/
COPY --chown=root:root docker/php/php.ini          /usr/local/etc/php/conf.d/php.ini

RUN set -eux; \
    chmod a+x /usr/local/bin/start-container ; \
    apk --update --no-cache add \
        curl \
        su-exec \
        supervisor \
    ;
    # apk add --update --no-cache --virtual .build-deps \
    #     $PHPIZE_DEPS \
    # ; \
    # pecl update-channels; \
    # pecl install \
    #     swoole \
    # ; \
    # docker-php-ext-enable swoole; \
    # rm -rf /tmp/pear ~/.pearrc; \
    # \
    # runDeps="$( \
    #     scanelf --needed --nobanner --format '%n#p' --recursive /usr/local \
    #         | tr ',' '\n' \
    #         | sort -u \
    #         | awk 'system("[ -e /usr/local/lib/" $1 " ]") == 0 { next } { print "so:" $1 }' \
    # )"; \
    # apk add --update --no-cache --virtual .run-deps $runDeps; \
    # apk del .build-deps;

ENTRYPOINT [ "start-container" ]
CMD ["php-fpm"]

# ========================
# Get vendors
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
    --optimize-autoloader \
    --prefer-dist

# ========================
# Production
# ========================
FROM runtime as production

COPY               --chown=root:root         docker/php/supervisord.conf /etc/supervisord.conf
COPY               --chown=root:root         docker/php/www-data.cron    /etc/crontabs/www-data
COPY               --chown=www-data:www-data .                           /var/www
COPY --from=vendor --chown=www-data:www-data /var/www/vendor             /var/www/vendor

RUN set -eux; \
    php /var/www/artisan package:discover; \
    php /var/www/artisan storage:link; \
    chown -R www-data:www-data /var/www;
