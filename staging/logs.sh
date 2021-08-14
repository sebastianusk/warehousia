#!/bin/bash
SERVER=root@128.199.206.195
DIR=/home/docker
ssh $SERVER docker-compose -f $DIR/staging/docker-compose.yaml logs -f
