import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as fs from 'fs';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';

export class MyCdkAppStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        // Create a VPC for the ASG
        const vpc = new ec2.Vpc(this, 'MyVpc', {
            maxAzs: 2, // Adjust as needed
        });

        // Read user data script
        const userDataScript = fs.readFileSync('lib/user-data.sh', 'utf-8');

        // Create an Auto Scaling Group with user data
        const asg = new autoscaling.AutoScalingGroup(this, 'MyAutoScalingGroup', {
            vpc,
            instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
            machineImage: ec2.MachineImage.latestAmazonLinux(),
            minCapacity: 2, // Minimum number of instances
            maxCapacity: 10, // Maximum number of instances
            desiredCapacity: 2, // Initial number of instances
            cooldown: Duration.seconds(60), // Cooldown period between scaling actions
            healthCheck: autoscaling.HealthCheck.ec2(), // EC2 instance health check
            userData: ec2.UserData.custom(userDataScript), // Use the user data script
        });

        // Create a Load Balancer
        const loadBalancer = new elbv2.ApplicationLoadBalancer(this, 'MyLoadBalancer', {
            vpc,
            internetFacing: true,
        });

        // Add the Auto Scaling Group as a target to the Load Balancer
        const listener = loadBalancer.addListener('MyHttpListener', {
            port: 80,
        });

        listener.addTargets('MyTargetGroup', {
            targets: [asg],
            port: 80,
        });
        
        // Create a CloudWatch metric for network in
        const networkInMetric = new cloudwatch.Metric({
          namespace: 'AWS/EC2',
          metricName: 'NetworkIn',
          dimensionsMap: {
            AutoScalingGroupName: asg.autoScalingGroupName,
          },
          statistic: 'Average',
          period: cdk.Duration.minutes(5),
        });

        // Create an Auto Scaling policy based on the network in metric
        const networkScalingPolicy = asg.scaleOnMetric('NetworkScalingPolicy', {
          metric: networkInMetric,
          scalingSteps: [
          { upper: 500 * 1024 * 1024, change: +1 }, // Increase by 1 instance if traffic is over 500MB
          { lower: 100 * 1024 * 1024, change: -1 }, // Decrease by 1 instance if traffic is below 100MB
          ],// Adjust these values as needed based on your application's characteristics
          });
    }
}
