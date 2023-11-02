import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as iam from 'aws-cdk-lib/aws-iam';

export class MoshtixStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    
    const websiteBucket = new s3.Bucket(this, 'MyReactAppBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
      blockPublicAccess: new s3.BlockPublicAccess({ blockPublicPolicy: false })
    });

    const bucketPolicy = new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        effect: iam.Effect.ALLOW,
        resources: [`${websiteBucket.bucketArn}/*`],
        principals: [new iam.AnyPrincipal()],
      });

    websiteBucket.addToResourcePolicy(bucketPolicy);
    
    new s3deploy.BucketDeployment(this, 'DeployReactApp', {
        sources: [s3deploy.Source.asset('app/build')],
        destinationBucket: websiteBucket,
      });


    // Create a CloudFront distribution
    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'MyReactAppDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: websiteBucket,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });
  }
}
