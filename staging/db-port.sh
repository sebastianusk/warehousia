#!/bin/sh
set -eux
ssh warehousia-staging -NTL 5433:127.0.0.1:5432
