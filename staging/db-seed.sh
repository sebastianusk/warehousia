#!/bin/sh
set -eux
ssh root@128.199.206.195 -NTL 5433:127.0.0.1:5432 &
pid=$!
dotenv -e .env.staging -- npm run db:push
dotenv -e .env.staging -- npm run db:seed
echo $pid
kill $pid
