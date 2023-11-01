import * as cdk from 'aws-cdk-lib';
import * as sns from "aws-cdk-lib/aws-sns";

// import { Template } from 'aws-cdk-lib/assertions';
import { Capture, Match, Template } from "aws-cdk-lib/assertions";
import { TestFiveStack } from '../lib/infrastructure-stack';

describe('TestFiveStack', () => {

  const config = {
    "Environment": "test",
    "frontendSources": "build",
    "domainName": "moshtix.test.site",
    "snsRecipient": "moshtix-recipient-test@gmail.com"
  };

  let app: cdk.App;
  let stack: TestFiveStack;
  let template: Template;

  beforeEach(() => {
    app = new cdk.App();
    stack = new TestFiveStack(app, config, 'TestFiveStack', {
      env: {
        account: '1234567890',
        region: 'us-east-1',
      }
    });
    template = Template.fromStack(stack);
  });

  it('creates an S3 bucket', () => {
    template.resourceCountIs('AWS::S3::Bucket', 1);
  });
});
