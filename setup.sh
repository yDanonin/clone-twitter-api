#!/bin/bash

CONTAINER=cloneTwitter

if [ "x$(which docker)" == "x" ]; then
  echo "docker is missing" # "UNKNOWN - Missing docker binary"
  exit 1
fi

docker info > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "UNKNOWN - Unable to talk to the docker daemon"
  exit 1
fi

RUNNING=$(docker inspect --format="{{.State.Running}}" $CONTAINER 2> /dev/null)

if [ $? -eq 1 ]; then
  docker run --detach --name $CONTAINER -p 3306:3306 --env MARIADB_DATABASE=cloneTwitter-db \
    --env MARIADB_USER=cloneTwitter-user --env MARIADB_PASSWORD=password --env MARIADB_ROOT_PASSWORD=rootpassword mariadb:latest
elif [ "$RUNNING" == "false" ]; then
  docker start $CONTAINER
fi
wait

RESTARTING=$(docker inspect --format="{{.State.Restarting}}" $CONTAINER)

if [ "$RESTARTING" == "true" ]; then
  echo "WARNING - $CONTAINER state is restarting."
  exit 1
fi

until [ "`docker inspect -f {{.State.Running}} $CONTAINER`"=="true" ]; do
    sleep 0.1;
done;

yarn prisma
wait

exit
