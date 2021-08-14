#!/bin/bash
SERVER=root@128.199.206.195
DIR=/home/docker
ssh $SERVER docker-compose -f $DIR/staging/docker-compose.yaml down && true
# ssh $SERVER rm -rf $DIR/staging
scp -r ./staging $SERVER:$DIR
ssh $SERVER docker-compose -f $DIR/staging/docker-compose.yaml up -d
