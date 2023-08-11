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