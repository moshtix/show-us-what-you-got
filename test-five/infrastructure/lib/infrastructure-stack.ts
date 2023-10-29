import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as certificateManager from 'aws-cdk-lib/aws-certificatemanager';
import * as targets from 'aws-cdk-lib/aws-route53-targets';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Setting the domain name by 
    const domainName = 'selemon-code.com';
    const siteDomain = 'www' + '.' + domainName;

    // Create an S3 bucket for the website
    const bucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: 'moshtix-app',
      websiteIndexDocument: 'index.html',
    });

    // Find the current hosted zone in Route 53
    const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName: domainName });
    console.log(zone);

    // Create a DNS-validated SSL certificate for the domain
    const certificate = new certificateManager.DnsValidatedCertificate(this, 'Certificate', {
      domainName: domainName,
      subjectAlternativeNames: ['*.' + domainName],
      hostedZone: zone,
      region: 'us-east-1', 
    });

    // Create an Origin Access Identity (OAI) for CloudFront
    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'OAI');

    // Create a CloudFront distribution for the website
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'MyDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity: cloudFrontOAI,
          },
          behaviors: [{ isDefaultBehavior: true }]
        }
      ],
      viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
        certificate,
        {
          aliases: [domainName, siteDomain],
          securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1,
          sslMethod: cloudfront.SSLMethod.SNI,
        },
      ),
    });

    // Create an Alias record in Route 53 to associate with the CloudFront distribution
    new route53.ARecord(this, 'Alias', {
      zone: zone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution))
    });

    // Grant read permissions to the CloudFront OAI for the S3 bucket
    bucket.grantRead(cloudFrontOAI.grantPrincipal);
  }
}
