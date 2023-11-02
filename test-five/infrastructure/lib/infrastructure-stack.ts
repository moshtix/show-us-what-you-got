import * as cdk from 'aws-cdk-lib';
import {
  aws_certificatemanager as acm,
  aws_cloudfront as cloudfront,
  aws_s3 as s3,
  aws_s3_deployment as s3Deploy,
  aws_route53 as route53,
  aws_route53_targets as targets,
  aws_cloudwatch as cloudwatch,
  aws_cloudwatch_actions as cw_actions,
  aws_sns as sns,
  aws_sns_subscriptions as subscriptions,
  CfnOutput,
  RemovalPolicy
} from 'aws-cdk-lib';

// Needed Stack varaibles.
export interface StackConfig {
  environment: string;
  domainName: string;
  frontendSources: string;
  snsRecipient: string;
}

/**
 * Represents the CloudFormation stack for the TestFive application.
 * @class
 * @extends cdk.Stack
 */
export class TestFiveStack extends cdk.Stack {
  constructor(scope: cdk.App, config: StackConfig, id: string, props?: cdk.StackProps) {
    const environment = config.environment;
    props = {
      ...props,
      stackName: `moshtix-test-five-stack-${environment}`
    }

    super(scope, id, props);

    /**
     * 👉 Stack Definition:
     */

    // Create an S3 bucket for the React app.
    const reactAppBucket = new s3.Bucket(this, "ReactAppBucket", {
      bucketName: `moshtix-test-five-fronted-${environment}`,
      publicReadAccess: false,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
      autoDeleteObjects: true,
    });

    // Create an Origin Access Identity (OAI) for CloudFront.
    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'OAI');
    reactAppBucket.grantRead(cloudFrontOAI.grantPrincipal);

    // Look up the hosted zone in Route 53 using the provided domain name.
    const zone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: config.domainName
    });

    // Create a DNS-validated certificate for the domain.
    const siteCertificate = new acm.DnsValidatedCertificate(this, 'Certificate Test Five', {
      domainName: config.domainName,
      subjectAlternativeNames: [`*.${config.domainName}`],
      hostedZone: zone,
      // The certificate must be issued in the us-east-1 (N. Virginia) region for it to be used with CloudFront.
      region: 'us-east-1'
    });

    // Create a CloudFront distribution for the React app.
    const cloudFrontWebDistribution = new cloudfront.CloudFrontWebDistribution(
      this, `moshtix-test-five-distribution-${environment}`, {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: reactAppBucket
          },
          behaviors: [{ isDefaultBehavior: true }]
        }
      ],
      viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(siteCertificate, {
        aliases: [config.domainName, `www.${config.domainName}`],
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
    new s3Deploy.BucketDeployment(this, `moshtix-test-five-s3-deployment-${environment}`, {
      sources: [s3Deploy.Source.asset(__dirname + `/../../frontend/${config.frontendSources}`)],
      destinationBucket: reactAppBucket,
      distribution: cloudFrontWebDistribution,
      distributionPaths: ['/*'],
    });

    /**
     * 👉 Alarms and Monitoring.
     */

    // Create an SNS Topic and a subscription.
    const snsTopic = new sns.Topic(this, "moshtix-test-five-sns", {
      displayName: `${this.stackName} SNS`,
      topicName: `moshtix-test-five-sns-topic-${environment}`,
    });
    snsTopic.addSubscription(
      new subscriptions.EmailSubscription(config.snsRecipient)
    );

    // Sets up an alarm that triggers if there are more than 100 errors in a 5-minute period for two consecutive periods.
    const s3BucketSizeAlarm = new cloudwatch.Alarm(this, `moshtix-test-five-alarm-higherrorrate-${environment}`, {
      metric: new cloudwatch.Metric({
        metricName: 'NumberOfErrors',
        namespace: 'AWS/S3',
        dimensionsMap: {
          BucketName: reactAppBucket.bucketName,
        },
        statistic: 'SampleCount',
        period: cdk.Duration.minutes(5),
      }),
      threshold: 100,
      evaluationPeriods: 2,
      datapointsToAlarm: 2,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      alarmDescription: 'S3 bucket number of errors.'
    });

    // Add an SNS action to the S3 bucket size alarm
    s3BucketSizeAlarm.addAlarmAction(new cw_actions.SnsAction(snsTopic));

    // Alarm that triggers if the average 4xx error rate exceeds 1% in a 5-minute period for two consecutive periods.
    const cloudWatch4xxErrorAlarm = new cloudwatch.Alarm(this, `moshtix-test-five-alarm-highcloudfront4xxerrorrate-${environment}`, {
      metric: new cloudwatch.Metric({
        metricName: '4xxErrorRate',
        namespace: 'AWS/CloudFront',
        dimensionsMap: {
          DistributionId: cloudFrontWebDistribution.distributionId,
        },
        statistic: 'Average',
        period: cdk.Duration.minutes(5),
      }),
      threshold: 1,
      evaluationPeriods: 2,
      datapointsToAlarm: 2,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      alarmDescription: 'High 4xx error rate on CloudFront distribution.'
    });

    // Add an SNS action to the CloudFront 4xx error rate alarm.
    cloudWatch4xxErrorAlarm.addAlarmAction(new cw_actions.SnsAction(snsTopic));

    // Create a Dashboard for Monitoring and Managing Alarms
    const dashboard = new cloudwatch.Dashboard(this, "Test Five Dashboard", {
      dashboardName: `moshtix-test-five-infrastructure-dashboard-${config.environment}`,
    });
    dashboard.addWidgets(
      new cloudwatch.AlarmWidget({ title: "High Error Rate", alarm: s3BucketSizeAlarm })
    );
    dashboard.addWidgets(new cloudwatch.AlarmWidget({
      title: "High Cloud Front 4xx Error Rate",
      alarm: cloudWatch4xxErrorAlarm
    })
    );

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
