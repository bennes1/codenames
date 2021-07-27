#!/bin/bash

# Run this as ". commands.sh" to get access to commands.
# Once you source it, you can run the aliases.

alias runapp="docker-compose down && docker-compose up --build &"

alias runweb="xdg-open 'localhost:$computerPort'"
