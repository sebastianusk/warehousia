#!/bin/sh
set -eux
ssh warehousia-staging -NTL 5433:127.0.0.1:5432 &
pid=$!
pgcli -h localhost -p 5433 -U postgres
echo $pid
kill $pid
