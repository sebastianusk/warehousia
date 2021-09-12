#!/bin/sh
set -eux
ssh warehousia-staging -NTL 5433:127.0.0.1:5432 &
pid=$!
dotenv -e .env.staging -- npx prisma migrate reset
dotenv -e .env.staging -- npm run db:seed
echo $pid
kill $pid
