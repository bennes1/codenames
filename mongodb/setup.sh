#!/bin/bash

mongo=( mongo --port 27017 )
mongo+=(
    -u $MONGO_INITDB_ROOT_USERNAME
    -p $MONGO_INITDB_ROOT_PASSWORD
)

CREATE_FILES=/scripts/*-create.js 
for f in $CREATE_FILES; do
    echo "Running $f...";
    cat $f | "${mongo[@]}";
    echo "Done with $f...";
done

INSERT_FILES=/scripts/*-insert.js 
for f in $INSERT_FILES; do
    echo "Running $f...";
    "${mongo[@]}" $f;
    echo "Done with $f...";
done
