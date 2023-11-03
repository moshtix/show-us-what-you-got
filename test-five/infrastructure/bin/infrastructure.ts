#!/usr/bin/env node

import * as cdk from 'aws-cdk-lib';
import { TestFiveS3WebSiteStack } from '../lib/infrastructure-s3-website-stack';

const app = new cdk.App();

const env = app.node.tryGetContext("config");
const config = app.node.tryGetContext(env);

async function buildStack() {
  new TestFiveS3WebSiteStack(app, config, "TestFiveS3WebSiteStack", {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION ,
    }
  });
}

buildStack()
