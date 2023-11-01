import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as iam from 'aws-cdk-lib/aws-iam';

export interface ReactAppCdkProps extends cdk.StackProps{
  stage: string;
  path: string;
}

export class ReactAppCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ReactAppCdkProps) {
    super(scope, id, props);

    const { stage, path } = props;

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'ReactAppCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(this, 'cloudfront-OAI', {
      comment: `OAI for react-app`
    }
    );

    // create s3 bucket to hold build files from react-app
    const bucket = new s3.Bucket(this, `react-app-${stage}`, {
      bucketName: `react-app-${stage}-bucket`,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // attach bucket policy to grant access to cloudfront distro
    bucket.addToResourcePolicy(
      new cdk.aws_iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [bucket.arnForObjects('*')],
        principals: [new iam.CanonicalUserPrincipal(cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId)]
      })
    )

    // create cloudfront distribution
    const distribution = new cloudfront.Distribution(this, `react-app-${stage}-distro`, {
      defaultRootObject: "index.html",
      defaultBehavior: {
        origin: new cloudfront_origins.S3Origin(bucket, {originAccessIdentity: cloudfrontOAI}),
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.ALLOW_ALL,
      },
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      comment: 'React App CDK Cloudfront Distribution'
    })

    // deploy react app to s3 bucket
    new cdk.aws_s3_deployment.BucketDeployment(this, 'react-app-${stage}-deployment', {
      destinationBucket: bucket,
      sources: [cdk.aws_s3_deployment.Source.asset(path)],
      cacheControl: [
        cdk.aws_s3_deployment.CacheControl.maxAge(cdk.Duration.days(1)),
      ],
      distribution,
      distributionPaths: ['/*'],
    })

    // output s3 bucket name
    new cdk.CfnOutput(this, 's3-bucket-name', {
      value: bucket.bucketName,
      description: 'S3 Bucket Name',
    });

    // output cloudfront distribution domain name which is the url to access the s3 bucket
    new cdk.CfnOutput(this, 'cloudfront-domain-name', {
      value: distribution.domainName,
      description: 'CloudFront Distribution Domain Name',
    });
  }
}
