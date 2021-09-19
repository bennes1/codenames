#!/bin/bash

case $1 in
	dbshell)
		container="codenames_mong"
		cmd="bash"
		;;
	dbprompt)
		container="codenames_mong"
		cmd="mongosh -u admin -p pass"
		;;
	webshell)
		container="codenames_frontend"
		cmd="bash"
		;;
esac

if [ -z ${container+x} ]; then
	echo "Command $1 not recognized."
else
	id=`docker ps | grep $container | cut -d' ' -f1`

	case $1 in
		dbshell)
			shift
			if [ -z "{$1}" ]; then
				docker exec -it $id bash
			else
				if [ "$1" == "bash" ]; then
					shift
				fi

				# If quoted, docker interprets it as a file
				docker exec -it $id bash $@
			fi
			;;
		webshell)
			shift
			docker exec -it $id sh "$@"
			;;
		dbprompt)
			cmd="mongosh -u admin -p pass"
			if [ -n "$2" ]; then
				docker exec -it $id bash -c "cat $2 | $cmd"
			else
				docker exec -it $id $cmd
			fi
			;;
	esac
fi
