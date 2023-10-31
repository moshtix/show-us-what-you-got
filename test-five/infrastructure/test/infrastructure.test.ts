import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { TestFiveStack } from '../lib/infrastructure-stack';

describe.skip('TestFiveStack', () => {
  let app: cdk.App;
  let stack: TestFiveStack;

  beforeEach(() => {
    app = new cdk.App();
    stack = new TestFiveStack(app, 'TestStack');
  });

  it('creates an S3 bucket', () => {
    const assert = Template.fromStack(stack);

    assert.resourceCountIs('AWS::S3::Bucket', 1);
    assert.hasResourceProperties('AWS::S3::Bucket', {
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
      VersioningConfiguration: {
        Status: 'Enabled',
      },
    });
  });

  it('creates a CloudFront distribution', () => {
    const assert = Template.fromStack(stack);

    assert.resourceCountIs('AWS::CloudFront::Distribution', 1);
    assert.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Enabled: true,
        Origins: [
          {
            DomainName: {
              'Fn::GetAtt': ['ReactAppBucket5C9B7F6D', 'RegionalDomainName'],
            },
            Id: 'ReactAppBucket5C9B7F6D',
            S3OriginConfig: {
              OriginAccessIdentity: {
                'Fn::Join': [
                  '',
                  [
                    'origin-access-identity/cloudfront/',
                    {
                      Ref: 'OAI4E7ABB9F',
                    },
                  ],
                ],
              },
            },
          },
        ],
        ViewerCertificate: {
          AcmCertificateArn: {
            Ref: 'Certificate56C8A9C9',
          },
          SslSupportMethod: 'sni-only',
          MinimumProtocolVersion: 'TLSv1.2_2019',
        },
        Aliases: [
          'example.com',
          'www.example.com',
        ],
      },
    });
  });

  it('creates an ACM certificate', () => {
    const assert = Template.fromStack(stack);

    assert.resourceCountIs('AWS::CertificateManager::Certificate', 1);
    assert.hasResourceProperties('AWS::CertificateManager::Certificate', {
      DomainName: 'example.com',
      SubjectAlternativeNames: [
        '*.example.com',
      ],
      ValidationMethod: 'DNS',
    });
  });

  it('creates a Route53 record', () => {
    const assert = Template.fromStack(stack);

    assert.resourceCountIs('AWS::Route53::RecordSet', 1);
    assert.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: 'example.com.',
      Type: 'A',
      AliasTarget: {
        DNSName: {
          'Fn::GetAtt': ['CDKCRAStaticDistributionEB4B9E2F', 'DomainName'],
        },
        HostedZoneId: 'Z2FDTNDATAQYW2',
      },
    });
  });
});
