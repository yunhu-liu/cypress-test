# CypressSolutionTesting
End to End testing solution with Cypress

## Prerequisites
+ Nodejs 
  
  Windows install: [https://nodejs.org/en/download/package-manager/#windows]
  
  MacOS install: [https://nodejs.org/en/download/package-manager/#macos]

  Other OSs install: [https://nodejs.org/en/download/package-manager/]

## Git clone the repo to local directory
```
cd /your/project/path
git clone https://github.com/MaxnzWZ/CypressSolutionTesting.git (through https)
or
git clone git@github.com:MaxnzWZ/CypressSolutionTesting.git (through ssh) 
``` 
## Install Cypress and other dependencies on local machine
```
cd /your/project/path/CypressSolutionTesting
npm install
```
## Verify installed Cypress
```
npx cypress version
npx cypress verify
```
## Run Cypress testing
### Run with Cypress test runner
#### Step 1. Open Cypress test runner
```
npx cypress open
```

#### Step 2. Select the available browers installed in your local computer to run the testing
![Change browser](images/changeBrowser.jpg)

#### Step 3. Select the individual test suite to run or select to run all test suites
![Run tests](images/runTests.jpg)


### Run Cypress testing by using command
#### Run all test cases in headless mode
```
npx cypress run --headless --browser chrome (headless run with chrome)
npx cypress run --headless --browser firefox (headless run with firefox)
```
#### Run tests specifying a single test file to run instead of all tests
```
npx cypress run --spec "cypress/integration/path_check_kiwisaver_calculator.spec.js"
```
#### Run tests with Cypress Dashboard [https://docs.cypress.io/guides/dashboard/introduction.html#Features]
```
npx cypress run --record --key d3c5d06d-20cf-4671-ae56-9d9378128b0b
```
Test results (logs, screenshots, videos) can be checked in the project folder in Cypress Dashboard server.
https://dashboard.cypress.io/projects/jzq43t


## Check result
### Check in testrunner
![Test result](images/testrunnerResult.jpg)

### Check in console
![Test result in Console](images/consoleResult.jpg)

### Check screenshots and output report in local project (after run testing with command line)
![project structure](images/projectStructure.jpg)

### Check test result in Cypress dashboard
https://dashboard.cypress.io/projects/jzq43t
![dashboard result](images/dashboardResult.jpg)

## Cypress documentation
https://docs.cypress.ios