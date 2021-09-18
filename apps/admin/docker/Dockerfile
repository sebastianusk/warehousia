FROM nginx:1.21.3
COPY ./dist/apps/admin/ /usr/local/apache2/htdocs/
ADD apps/admin/docker/default_nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
