import * as route53 from 'aws-cdk-lib/aws-route53';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

import { BlockPublicAccess, BucketAccessControl } from 'aws-cdk-lib/aws-s3';

import { CfnOutput, Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

  // 1. My root domain and subdomain.
  const domainName = 'saltagray.online';
  const siteDomain = 'www' + '.' + domainName; 


    // 1.1 Finds the current hosted zone in Route 53. I created a hosted zone manually and updated the NS records.
      const zone = route53.HostedZone.fromLookup(this, 'Zone', { domainName: domainName });
      console.log(zone);
    
  // 2. Created a TLS/SSL certificate for HTTPS
        const certificate = new acm.DnsValidatedCertificate(this, 'SiteCertificate', {
          domainName: domainName,
          subjectAlternativeNames: ['*.' + domainName],
              hostedZone: zone,
              region: 'us-east-1', 
        });

    
        certificate.applyRemovalPolicy(RemovalPolicy.DESTROY)

        new CfnOutput(this, 'Certificate', { value: certificate.certificateArn });
    

  // 3. Created an S3 bucket to store content which is publicly available.
        const siteBucket = new s3.Bucket(this, 'SiteBucket', {
          bucketName: siteDomain, 
          publicReadAccess: true,
          removalPolicy: RemovalPolicy.DESTROY, 
          autoDeleteObjects: true,
          blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
          accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
          websiteIndexDocument: 'index.html',
          websiteErrorDocument: 'index.html'})

          new CfnOutput(this, 'Bucket', { value: siteBucket.bucketName });

  // 4. Deployed CloudFront distribution
        const distribution = new cloudfront.Distribution(this, 'SiteDistribution', {
          certificate: certificate,
          defaultRootObject: "index.html",
          domainNames: [siteDomain,domainName], 
          minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
         
          defaultBehavior: {
            origin: new cloudfront_origins.S3Origin(siteBucket),
            compress: true,
            allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
            viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          }
        });

        new CfnOutput(this, 'DistributionId', { value: distribution.distributionId });

   //5. Created a Route 53 alias record for the CloudFront distribution
        //5.1  Adds an 'A' record to Route 53 for 'www.saltagray.online'
        new route53.ARecord(this, 'WWWSiteAliasRecord', {
          zone,
          recordName: siteDomain,
          target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution))
        }); 
        //5.2 Added an 'A' record to Route 53 for 'saltagray.online'
        new route53.ARecord(this, 'SiteAliasRecord', {
          zone,
          recordName: domainName,
          target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution))
        });

    //6. Deployed the content from the 'my-react-app' into S3 bucket
        new s3deploy.BucketDeployment(this, 'DeployWebsite', {
          sources: [s3deploy.Source.asset('./my-react-app/build')],
          destinationBucket: siteBucket,
        });
  }
}
