# AWS CDK Typescript Project
This aws cdk project creates an s3 bucket and a cloudfront distribution to host a static react application.

## Set app variables

* `export STAGE=[stage-name]`   sets the stage or environment for the app

## Set aws env variables

* `export CDK_DEFAULT_REGION=[region]`   sets the stage or environment for the app
* `export CDK_DEFAULT_ACCOUNT=[AWS account number]`   sets the stage or environment for the app

Make sure to also set the `AWS_ACCESS_KEY` and `AWS_SECRET_KEY` before running the cdk commands

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
