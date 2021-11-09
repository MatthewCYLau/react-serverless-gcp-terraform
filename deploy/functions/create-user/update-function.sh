#!/bin/bash

zip -r create-user-function.zip index.js package.json && \
gcloud functions deploy create-user --trigger-http --runtime=nodejs14 --allow-unauthenticated --region=europe-west2 \
--source=gs://react-serverless-cloud-functions-bucket/create-user