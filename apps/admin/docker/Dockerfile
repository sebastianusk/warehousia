FROM nginx:1.21.3
COPY ./dist/apps/admin/ /usr/share/nginx/html
ADD apps/admin/docker/default_nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
