const { test, expect } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
const registrationData = require("../../UI/resources/data/toolshop/registrationData.json");
const utils = require("../../commonUtils/utils");
const { commonMethods } = require("../../API/utilities/apiHelper");
const { _Response } = require("../../API/testdata/commonAPIResponse");
const authPage = require("../../API/pageobjects/toolshop/toolshopAuthPage");

/**
 * AC1: User Registration & Login
 * The user should be able to register with valid details, log in using the
 * registered credentials, and verify their profile information successfully.
 */
test.describe("AC1: User Registration & Login", () => {
  let poManager;
  let uniqueEmail;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    uniqueEmail = await utils.generateRandomData("email");
  });

  test("AC1: Register with valid details, login and verify profile @sanity @regression", async ({ page }) => {
    await utils.addTestAnnotationsByKeyword("ac1_ui");

    const registrationPage = poManager.getToolshopRegistrationPage();
    const loginPage = poManager.getToolshopLoginPage();

    await registrationPage.goto();
    await registrationPage.registerUser(registrationData.validUser, uniqueEmail);
    await registrationPage.verifyRegistrationSuccess();

    await loginPage.goto();
    await loginPage.login(uniqueEmail, registrationData.validUser.password);
    await loginPage.verifyLoginSuccess(registrationData.validUser.firstName);
    await loginPage.verifyProfileInformation(
      registrationData.validUser.firstName,
      registrationData.validUser.lastName,
      uniqueEmail
    );

    await page.context().storageState({ path: "./storeBrowserState.json" });
    console.log("AC1 UI passed: registration, login and profile verified");
  });

  test("AC1 negative: Login with incorrect password shows error @regression", async () => {
    await utils.addTestAnnotationsByKeyword("ac1_ui_neg");

    const apiClient = new commonMethods();
    const registerResponse = await apiClient.PostResponse(
      authPage.registerEndpoint,
      authPage.buildRegisterPayload(uniqueEmail),
      authPage.registerHeader
    );
    expect(registerResponse.status()).toBe(_Response.postPositive);

    const loginPage = poManager.getToolshopLoginPage();
    await loginPage.goto();
    await loginPage.login(uniqueEmail, "WrongPassword!99");
    await loginPage.verifyLoginFailure();

    console.log("AC1 UI negative passed: invalid login error verified");
  });
});
