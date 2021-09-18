#!/bin/sh
set -eux
ssh root@128.199.206.195 -NTL 5433:127.0.0.1:5432
