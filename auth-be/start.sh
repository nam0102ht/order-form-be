#!/bin/bash
docker run -p 3306:3306 --name mysql-demo -e MYSQL_ROOT_PASSWORD=root -d mysql:5.6
docker run --name redis-demo -p 6376:6379 -d redis:latest