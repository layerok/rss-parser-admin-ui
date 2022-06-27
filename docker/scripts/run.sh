#!/bin/sh

cd /var/www
composer install --optimize-autoloader --no-dev --ignore-platform-reqs
php artisan cache:clear
php artisan config:clear
php artisan view:clear
php artisan route:clear
php artisan key:generate --force
php artisan jwt:secret --force
php artisan migrate:fresh --seed
php artisan lifehacker:parse-rss
/usr/bin/supervisord -c /etc/supervisord.conf