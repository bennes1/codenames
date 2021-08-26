FROM nginx:latest
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY nginx-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["sh", "/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
