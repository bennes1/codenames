#!/bin/sh

# Replace environment variables in conf file.
eval "echo \"`cat /etc/nginx/nginx.conf.template`\"" > /etc/nginx/nginx.conf

# and add this at the end
exec "$@"
