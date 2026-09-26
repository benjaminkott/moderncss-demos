# Production image: Symfony on PHP 8.4 with Apache (mod_php). public/.htaccess
# routes everything to index.php, so Apache needs nothing beyond the docroot.

# Frontend (Webpack Encore) -> public/build
FROM node:22-alpine AS assets
WORKDIR /app
COPY package.json package-lock.json webpack.config.js ./
RUN npm ci --no-audit --no-fund
COPY assets assets
COPY resources resources
COPY public public
RUN npm run build

FROM php:8.4-apache

RUN apt-get update \
    && apt-get install -y --no-install-recommends unzip libicu-dev \
    && docker-php-ext-install -j"$(nproc)" intl opcache \
    && apt-get purge -y --auto-remove libicu-dev \
    && apt-get install -y --no-install-recommends libicu76 curl \
    && rm -rf /var/lib/apt/lists/*

RUN a2enmod rewrite headers expires deflate \
    && sed -ri 's#/var/www/html#/var/www/html/public#g' /etc/apache2/sites-available/000-default.conf \
    && printf '<Directory /var/www/html/public>\n    AllowOverride All\n</Directory>\nServerTokens Prod\nServerSignature Off\n' > /etc/apache2/conf-enabled/symfony.conf

COPY infra/php.ini /usr/local/etc/php/conf.d/zz-app.ini
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
ENV APP_ENV=prod APP_DEBUG=0

COPY composer.json composer.lock symfony.lock ./
RUN composer install --no-dev --no-interaction --no-progress --prefer-dist --no-scripts --no-autoloader

COPY . .
COPY --from=assets /app/public/build public/build
RUN composer dump-autoload --no-dev --classmap-authoritative \
    && composer run-script --no-dev auto-scripts \
    && chown -R www-data:www-data var

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD curl -fsS -o /dev/null http://127.0.0.1/ || exit 1
