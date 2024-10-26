FROM php:8.2-cli

RUN apt-get update \
  && apt-get install -y \
    libpq-dev \
    postgresql-client \
    libzip-dev \
  && docker-php-ext-install \
    opcache\
    pgsql \
    zip \
  && pecl install xdebug-3.2.2 \
  && docker-php-ext-enable xdebug

RUN curl -sS https://getcomposer.org/installer >composer-setup.php \
  && php composer-setup.php --quiet \
    --install-dir=/usr/local/bin --filename=composer \
  && rm composer-setup.php

WORKDIR /src

CMD ["tail", "-f", "/dev/null"]
