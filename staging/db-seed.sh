#!/bin/sh
dotenv -e .env.staging -- npx prisma migrate reset
dotenv -e .env.staging -- npm run db:seed
