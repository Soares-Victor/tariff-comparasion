#!/bin/bash

shopt -s expand_aliases
alias aws-docker='docker run --network host --rm -ti -v ~/.aws:/root/.aws -v $(pwd):/aws amazon/aws-cli'
aws-docker --version
docker-compose up -d
sleep 10
aws-docker --endpoint-url=http://localhost:4566 s3 mb s3://projectsysvictor-tariff-toprocess
aws-docker --endpoint-url=http://localhost:4566 s3 mb s3://projectsysvictor-user-photos
docker build -t ui-common ../ui-common
docker run -it -d --network host ui-common
docker build -t ms-tariff-comparison ../ms-tariff-comparison
docker run -it -d --network host ms-tariff-comparison
docker build -t ms-user ../ms-user
docker run -it -d --network host ms-user
docker build -t gtw-common ../gtw-common
docker run -it -d --network host gtw-common
docker build -t bff-common ../bff-common
docker run -it -d --network host bff-common