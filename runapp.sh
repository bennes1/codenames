#!/bin/bash

file1="docker-compose.yml"
file2="docker-compose.dev.yml"

build=
while getopts ":pb" flag
do
	case "${flag}" in
  	p )
		  file2="docker-compose.prod.yml"
		  ;;
  	b )
		build="true"
		  ;;
	  \? )
		  echo "Invalid Option: -$OPTARG" 1>&2
		  exit 1
		  ;;
	  : )
		  echo "Invalid Option: -$OPTARG requires an argument" 1>&2
		  exit 1
		;;
	esac
done

docker-compose down

if [ -n "${build}" ]; then
	docker-compose -f $file1 -f $file2 build
fi

docker-compose -f $file1 -f $file2 up &
