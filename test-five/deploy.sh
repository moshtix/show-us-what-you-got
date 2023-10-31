#!/bin/bash

# Script used for local tests.
# Note that below env variables need to be informed in order to make the deployment work.

cd frontend

printf "\n"
echo "--- Building frontend..."
printf "\n"

npm run build

cd ../infrastructure

printf "\n"
echo "--- Deploying infrastructure..."
printf "\n"

DOMAIN_NAME="" \
CDK_DEFAULT_ACCOUNT= \
CDK_DEFAULT_REGION="" \
cdk deploy TestFiveStack --parameters Environment=prod --require-approval never --progress=events

exit 0
