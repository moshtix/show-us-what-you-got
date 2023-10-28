#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { InfrastructureStack } from '../lib/infrastructure-stack';

// Access AWS account and region from environment variables
const account = process.env.AWS_ACCOUNT_ID;
const region = process.env.AWS_REGION;

if (!account || !region) {
  throw new Error('AWS_ACCOUNT_ID and AWS_REGION environment variables must be defined.');
}

const app = new cdk.App();
new InfrastructureStack(app, 'InfrastructureStack', {
  env: {
    account,
    region,
  },
});