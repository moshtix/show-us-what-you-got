# Interview Notes
## Set up

### 1. Set Up the Development Environment
Before you begin, make sure you have the following installed:
* Node.js and npm (Node Package Manager)
* AWS CLI (Command Line Interface)
* AWS CDK

### 2. Create a New AWS CDK Project
Open your terminal and run the following commands to create a new AWS CDK project:
``` 
mkdir MyCdkApp
cd MyCdkApp
cdk init app --language=typescript
```
### 3. Create a 'create react app' Application
In the project directory, create your 'create react app' application:
``` 
npx create-react-app my-react-app
```
### 4. Define AWS CDK Stack
Open the lib folder in your CDK project and modify the MyCdkAppStack.ts file to define your CDK stack. 

In this example, I went with an EC2 deployment. 

In your AWS CDK stack (MyCdkAppStack.ts), you'll need to import the necessary EC2 module and define an EC2 instance. You can use the Instance class to create an EC2 instance. You'll also need to specify the instance type, Amazon Machine Image (AMI), and other configuration options.

Here's a simplified example:
```
import * as ec2 from 'aws-cdk-lib/aws-ec2';

// ...

// Create a VPC for the EC2 instance
const vpc = new ec2.Vpc(this, 'MyVpc', {
    maxAzs: 2, // Adjust as needed
});

// Create an EC2 instance
const ec2Instance = new ec2.Instance(this, 'MyEC2Instance', {
    vpc,
    instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
    machineImage: ec2.MachineImage.latestAmazonLinux(),
    keyName: 'your-key-name', // Replace with your SSH key name
});

```

### Configure User Data for EC2 Instances 
#### (lib/user-data.sh):
This script will be used as user data for the EC2 instances to deploy and start your 'create react app'.

##### via GITHUB
```
#!/bin/bash
yum update -y
yum install -y git
curl -sL https://rpm.nodesource.com/setup_16.x | bash -
yum install -y nodejs

# Clone your 'create react app' repository
git clone https://github.com/your/repo.git /var/www/app

# Install dependencies and start the app
cd /var/www/app
npm install
npm start
```

##### via Project Folder
```
#!/bin/bash

# Update and install necessary packages
yum update -y
yum install -y git
curl -sL https://rpm.nodesource.com/setup_16.x | bash -
yum install -y nodejs

# Copy the contents of your 'create react app' project to the instance
mkdir -p /var/www/app
cp -r /path/to/your/react/app/* /var/www/app

# Install dependencies and start the app
cd /var/www/app
npm install
npm start
```

## Tune EC2 for scalability and resilience
### VPC Configuration
#### Example
```VPC Configuration (const vpc = new ec2.Vpc(this, 'MyVpc', {...})):```

By creating a Virtual Private Cloud (VPC) for your Auto Scaling Group (ASG) and Load Balancer, you isolate your resources and networking from the broader AWS environment. Using multiple Availability Zones (maxAzs: 2) ensures redundancy in case of infrastructure failures in one zone. This choice enhances resilience by providing fault tolerance and reducing the impact of hardware or data center issues.

### Multi-AZ Deployment:
Deploy instances across multiple Availability Zones (AZs) to ensure resilience against AZ failures. In the Auto Scaling Group configuration, set the availabilityZones property.

### Use Auto Scaling Groups:
Auto Scaling Groups (ASGs) allow you to automatically adjust the number of instances based on traffic and load. This provides both scalability and resilience by ensuring that your application can handle varying levels of traffic and recover from instance failures.

#### Example 
```Auto Scaling Group (const asg = new autoscaling.AutoScalingGroup(this, 'MyAutoScalingGroup', {...})):```

Setting up an ASG allows your application to automatically scale the number of EC2 instances based on demand. The specified minCapacity, maxCapacity, and desiredCapacity parameters enable your application to handle varying workloads efficiently. The cooldown period between scaling actions prevents rapid, unnecessary scaling and ensures a balanced approach to adjusting capacity.

### Load Balancing
Distribute incoming traffic across multiple instances using a load balancer. This enhances both scalability and resilience by ensuring even distribution of load and providing failover capabilities.

### Health Checks 
Configure health checks for the load balancer to monitor the instances' health and automatically route traffic to healthy instances.
#### Example
``` (healthCheck: autoscaling.HealthCheck.ec2()) and Load Balancing (const loadBalancer = new elbv2.ApplicationLoadBalancer(this, 'MyLoadBalancer', {...})):```

Implementing health checks for the EC2 instances ensures that only healthy instances receive traffic from the load balancer. The Elastic Load Balancer (ELB) (ApplicationLoadBalancer in this case) evenly distributes incoming traffic among healthy instances, contributing to even resource utilization and preventing overloading of specific instances. This load balancing mechanism enhances resilience by distributing traffic and handling failures gracefully.

### Amazon Machine Image (AMI) Selection 
#### Example 
```(machineImage: ec2.MachineImage.latestAmazonLinux())```

Choosing a well-maintained and up-to-date machine image, such as the latest Amazon Linux image, helps ensure that your EC2 instances run on a secure and reliable operating system. This choice contributes to the overall resilience of your application by reducing the risk of vulnerabilities or compatibility issues.

### Coordinated Scaling 
#### Example
```(cooldown: Duration.seconds(60))```

The cooldown period specified between scaling actions ensures that the ASG scales in a controlled and coordinated manner. This prevents rapid, consecutive scaling actions, which could potentially lead to resource overutilization or instability. Coordinated scaling enhances the overall resilience of your application by maintaining stability during periods of change.

#### CloudWatch Metric and Scaling Policy: 

* const networkInMetric: This creates a CloudWatch metric named NetworkIn in the AWS/EC2 namespace. It uses the dimensions of the Auto Scaling Group to scope the metric to the specific Auto Scaling Group (asg.autoScalingGroupName). The statistic is set to Average, which means the metric will track the average value over a specific period (configured using period).

* const networkScalingPolicy: This uses the scaleOnMetric method to create an Auto Scaling policy named NetworkScalingPolicy. It uses the previously defined networkInMetric as the triggering metric. The scalingSteps array defines the scaling actions to take based on the thresholds you specified. In this example, if the average network traffic (NetworkIn) exceeds 500MB, the policy will increase the desired capacity of the Auto Scaling Group by 1 instance. If the network traffic drops below 100MB, the policy will decrease the desired capacity by 1 instance.

#### Example based off pseudocode above:

```
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
    ],
    // Adjust these values as needed based on your application's characteristics
});
```
