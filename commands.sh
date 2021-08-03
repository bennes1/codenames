#!/bin/bash

# Run this as ". commands.sh" to get access to commands.
# Once you source it, you can run the aliases.

function runapp() {
	file1="docker-compose.yml"
	file2="docker-compose.dev.yml"
	if [ "prod" == "$1" ]; then
		file2="docker-compose.prod.yml"
	fi

	docker-compose down && \
	docker-compose -f $file1 -f $file2 up --build &
}

function appgo() {
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
				docker exec -it $id bash "$@"
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
}

alias dbshell="appgo dbshell"
alias dbprompt="appgo dbprompt"
alias webshell="appgo webshell"
