#!/usr/bin/env node

import * as cdk from 'aws-cdk-lib';
import { TestFiveStack } from '../lib/infrastructure-stack';

const app = new cdk.App();

const env = app.node.tryGetContext("config");
const config = app.node.tryGetContext(env);

async function buildStack() {
  new TestFiveStack(app, config, "TestFiveStack", {
    env: {
      account: process.env.CDK_DEFAULT_ACCOUNT,
      region: process.env.CDK_DEFAULT_REGION ,
    }
  });
}

buildStack()
