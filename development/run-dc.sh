#!/bin/sh

cd ../front-end-app
yarn
cd ../development

cd ../back-end-api
yarn
cd ../development

docker-compose --project-directory .. -f docker-compose.yml up
docker-compose --project-directory .. -f docker-compose.yml down