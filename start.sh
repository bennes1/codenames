#!/bin/bash
computerPort=49160
dockerPort=8080

( 
	docker-compose down && \
	docker-compose up --build && \
	echo "Open localhost:$computerPort to see the application."

	) &

