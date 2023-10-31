import * as cdk from 'aws-cdk-lib';
import {
  aws_certificatemanager as acm,
  aws_cloudfront as cloudfront,
  aws_s3 as s3,
  aws_s3_deployment as s3Deploy,
  aws_route53 as route53,
  aws_route53_targets as targets,
  CfnOutput,
  CfnParameter,
  RemovalPolicy
} from 'aws-cdk-lib';

// Setting the domain name.
const DOMAIN_NAME = process.env.DOMAIN_NAME!;

/**
 * Represents the CloudFormation stack for the TestFive application.
 * @class
 * @extends cdk.Stack
 */
export class TestFiveStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * 👉 Environment Variable:
     */

    const envParameter = new CfnParameter(this, "Environment", {
      type: "String",
      description: "The app environment, e.g. prod",
      default: "local"
    });

    /**
     * 👉 Stack Definition:
     */

    // Create an S3 bucket for the React app.
    const reactAppBucket = new s3.Bucket(this, "ReactAppBucket", {
      bucketName: `moshtix-fronted-${envParameter.valueAsString}`,
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
      autoDeleteObjects: true,
      // Needed in some scenarios, need more investigation.
      // blockPublicAccess: {
      //   blockPublicAcls: false,
      //   blockPublicPolicy: false,
      //   ignorePublicAcls: false,
      //   restrictPublicBuckets: false,
      // } as s3.BlockPublicAccess
    });

    // Create an Origin Access Identity (OAI) for CloudFront.
    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'OAI');
    reactAppBucket.grantRead(cloudFrontOAI.grantPrincipal);

    // Look up the hosted zone in Route 53 using the provided domain name.
    const zone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: DOMAIN_NAME
    });

    // Create a DNS-validated certificate for the domain.
    const siteCertificate = new acm.DnsValidatedCertificate(this, 'Certificate', {
      domainName: DOMAIN_NAME,
      subjectAlternativeNames: ['*.' + DOMAIN_NAME],
      hostedZone: zone,
      // The certificate must be issued in the us-east-1 (N. Virginia) region for it to be used with CloudFront.
      region: 'us-east-1'
    });

    // Create a CloudFront distribution for the React app.
    const cloudFrontWebDistribution = new cloudfront.CloudFrontWebDistribution(this, "CDKCRAStaticDistribution", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: reactAppBucket
          },
          behaviors: [{ isDefaultBehavior: true }]
        }
      ],
      viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(siteCertificate, {
        aliases: [DOMAIN_NAME, `www.${DOMAIN_NAME}`],
        securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
        sslMethod: cloudfront.SSLMethod.SNI
      })
    });

    // Create an alias record in Route 53 that points to the CloudFront distribution.
    new route53.ARecord(this, 'Alias', {
      zone: zone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(cloudFrontWebDistribution))
    });

    // Deploy the React app to the S3 bucket.
    new s3Deploy.BucketDeployment(this, "DeployCRA", {
      sources: [s3Deploy.Source.asset(__dirname + "/../../frontend/build")],
      destinationBucket: reactAppBucket,
      distribution: cloudFrontWebDistribution,
      distributionPaths: ['/*'],
    });

    /**
     * 👉 Output
     */

    new CfnOutput(this, "reactAppBucketName", {
      value: reactAppBucket.bucketName,
    });

    new CfnOutput(this, "cloudFrontDistributionDomainName", {
      value: cloudFrontWebDistribution.distributionDomainName,
    });

    new CfnOutput(this, "siteCertificateCertificateArn", {
      value: siteCertificate.certificateArn,
    });
  }
}
