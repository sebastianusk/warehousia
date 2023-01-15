#!/bin/sh
set -eux
dotenv -e ./production/db/.env -- npm run db:reset
dotenv -e ./production/db/.env -- npm run db:prod:seed
