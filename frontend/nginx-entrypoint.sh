#!/bin/sh

# Replace environment variables in conf file.
dir=/etc/nginx/conf.d
eval "echo \"`cat $dir/nginx.conf.template`\"" > $dir/nginx.conf

# and add this at the end
exec "$@"
