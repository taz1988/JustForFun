#!/bin/bash
# docker run --name wavsepdb -e MYSQL_ROOT_PASSWORD=wavsep -d mysql
wavsepdbid=`docker ps -a -q -f 'name=wavsepdb'`
echo "Start mysql for wavsepdbid"
docker start $wavsepdbid
echo "Start wavsep"
docker run docker.io/andresriancho/pico-wavsep
