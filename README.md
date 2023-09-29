# show-us-what-you-got

## Introduction

This repository is given to new candidates to get a feel for how we would work together.

Please only complete the test/s requested as part of your application.

Please fork this repository, commit as necessary, create a pull request for us to review, and send an email to let us know that you have finished.

The details of the individual tests follow, along with step by step instructions to get up and running once you have a local clone of the repository. Good luck : )

## Test One

Write a program that prints the numbers from 1 to 100. But for multiples of three print 'Boss' instead of the number and for the multiples of five print 'Hog'. For numbers which are multiples of both three and five print 'BossHog'.

### Getting Started

Make sure you have the latest version of node installed. Visit the nodeJS website and download the latest install package (the package manages upgrades too).

Open a console window/tab to the 'test-one' project directory and run the following commands...

Download project dependencies.

```
npm ci
```

Transpile code from src folder to lib folder

```
npm run build
```

Run unit tests

```
npm test
```

and finally start the program

```
npm run go
```

Note that you can use the following command to build, test and run the program every time you save a file (instead of running the other commands every time you want to test your changes)

```
npm start
```

Now when you change code in the project src folder, nodemon will re-transpile, re-run unit tests, and re-start the program. See for yourself, go ahead and try changing the value of the message variable in test-one/src/index.js.

## Test Two

Currently, the 'test two' project makes requests to the GitHub API and outputs the first page of users belonging to Google's GitHub organisation. What we'd really like to see is **all** Google GitHub users. Bonus points for performance.

Just to clarify, by the time you've completed the challenge, the program...

- should output all Google users (hint there are over 2000 users)

Note that the GitHub API limits requests, and you will probably reach the anonymous request limit while implementing this solution. To overcome this limit you will need to generate an OAuth key in your GitHub account's developer settings, and paste the key into the gitHubApiAuthToken constant in test-two/src/index.js

### Getting Started

Make sure you have the latest version of node installed. Visit the nodeJS website and download the latest install package (the package manages upgrades too).

Open a console window/tab to the 'test-two' project directory and run the following commands...

Download project dependencies.

```
npm i
```

Transpile code from src folder to lib folder

```
npm run build
```

Run unit tests

```
npm test
```

and finally start the program

```
npm run go
```

Note that you can use the following command to build, test and run the program every time you save a file (instead of running the other commands every time you want to test your changes)

```
npm start
```

Now when you change code in the project src folder, nodemon will re-transpile, re-run unit tests, and re-start the program. See for yourself, go ahead and try changing test-two/src/index.js.

## Test Three

Currently, the 'test three' project includes a single file (menu-data.json), which as you may have guessed, contains a menu structure represented as JSON.

Using React and which ever other tools/libraries you choose, implement a website that includes a working menu that renders the menu items from the provided JSON file.

The website does not necessarily need to include any content, your focus should be on the menu. Feel free to extend or manipulate the structure of the JSON file if necessary.

## Test Four

This is a CSS challenge. Open the index.html file in a browser. Edit only the `main.css` file to make the page look like the image below.

- Preferably do not edit the index.html file

![example4.1.png](images/example4.1.png)

## Test Five

Create an AWS CDK Typescript project that deploys a 'create react app' (https://create-react-app.dev/docs/getting-started/) to AWS considering scalability, resilience, and cost.
