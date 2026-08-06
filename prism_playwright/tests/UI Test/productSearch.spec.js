const { test } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
const registrationData = require("../../UI/resources/data/toolshop/registrationData.json");
const utils = require("../../commonUtils/utils");

/**
 * TC-UI-013: Search products by keyword on home page.
 */
test.describe("AC2: Product Search", () => {
  test.beforeEach(async ({ page }) => {
    const poManager = new POManager(page);
    const uniqueEmail = await utils.generateRandomData("email");
    const registrationPage = poManager.getToolshopRegistrationPage();
    const loginPage = poManager.getToolshopLoginPage();

    await registrationPage.goto();
    await registrationPage.registerUser(registrationData.validUser, uniqueEmail);
    await registrationPage.verifyRegistrationSuccess();
    await loginPage.goto();
    await loginPage.login(uniqueEmail, registrationData.validUser.password);
    await loginPage.verifyLoginSuccess();
  });

  test("TC-UI-013: Search products by keyword shows matching results @regression", async ({ page }) => {
    await utils.addTestAnnotationsByKeyword("ac2_ui_search");

    const poManager = new POManager(page);
    const productPage = poManager.getToolshopProductPage();
    await productPage.goto();
    await productPage.searchProduct("pliers");
    await productPage.verifySearchResultsContain("pliers");

    console.log("TC-UI-013 passed: product search verified");
  });
});
