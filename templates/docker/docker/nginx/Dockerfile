FROM nginx:stable-alpine

ENV PHP_FPM_ENDPOINT=localhost:9000

COPY docker/nginx/fpm.conf  /etc/nginx/templates/default.conf.template
COPY public                 /var/www/public
