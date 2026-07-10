# PlayWright Prism Framework

## Framework Structure

1. **API** - All the API related Functions.
2. **UI** - All Web Related Functions
3. **test-results** - HTML Report
4. **allure-results** - Allure report (npx allure generate --clean allure-results && npx allure open)
5. **node_modules** : Dependencies and libraries (Playwright & External)
6. **tests** - API & UI tests and execution Steps.
7. **.env File** - URLs and credentials like Base_URL and user data.
8. **playwright.config.ts** - Project , directories, browsers and timeout setup.

## API :

1. pageobjects - Page objects , EndPoints , Headers and Body data.
2. testdata -

   1. Common API Responses (i.e. Get Request - 200 for success)) .
   2. api_request.log : File created by requestToCurlLogger Utility, having API Curls.
   3. login.json :
3. utilities

   1. apiHelper class , All the common functions for calling and API i.e. Get, Post, Put,Patch, Delete.
   2. createDynamicData - Getters and Setters to store and reuse API responses.
   3. excelReader: Utility to convert excel to JSON and read JSON data
   4. excelWriter: Write JSON data into Excel files.
   5. logger: Log data into debug console.
   6. requestToCurlLogger: By using this utility, We can create a CURL request to the APIs, which can be further utilized in Postman to debug the issue.
   7. storeFullAPIResponse: By using this utility, We can create JSON file for response , which can be further utilized for test data in various APIs.

## UI :

1. pageobjects - Page objects ,Locators & Page related Functions .
2. resources -
   1. testdata
   2. images
   3. pdfs
3. utilities
   1. commonutils - common methods of execution
   2. databaseManager - DB connector

## Tests:

1. API tests - test cases and assertions.
2. UI Tests - Web test cases



<!-- Prerequisites -->
1. Install Node from https://nodejs.org/en
2. Install NPM
3. Install VS code.
4. Install VS code playwright Plugin by microsoft

<!-- Installation Process -->
1. Clone the Project Repo.
2. Go to the cloned folder and open terminal there.
3. Within terminal- Run command npm install

<!-- Playwright CLI commands -->
1. All playwright Tests - npx playwright test
2. UI Mode - npx playwright test --ui
3. Single Test File - npx playwright test landing-page.spec.js
4. Single Test Only - npx playwright test -g "add a todo item"
5. Headed Browser - npx playwright test --headed
6. Browser Specific - npx playwright test --project webkit --project firefox
7. Codegen - npx playwright codegen <WEB_URL>
