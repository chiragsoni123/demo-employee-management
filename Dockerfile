FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y apache2 php libapache2-mod-php php-mysql && apt-get clean

RUN a2enmod rewrite ssl

COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html


EXPOSE 80 443

CMD ["apachectl", "-D", "FOREGROUND"]