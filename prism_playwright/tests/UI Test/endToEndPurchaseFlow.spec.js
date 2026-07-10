const { test } = require("@playwright/test");
const { POManager } = require("../../UI/pageobjects/POManager");
const registrationData = require("../../UI/resources/data/toolshop/registrationData.json");
const billingData = require("../../UI/resources/data/toolshop/billingData.json");
const utils = require("../../commonUtils/utils");

/**
 * AC2: End-to-End Purchase Flow
 * The user should be able to browse products, add multiple items to the cart
 * (including updating quantity), complete checkout using Cash on Delivery, and
 * successfully view the generated invoice under My Invoices.
 * Note: Press confirm twice on the application to generate invoice.
 */
test.describe("AC2: End-to-End Purchase Flow", () => {
  let poManager;
  let uniqueEmail;

  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    uniqueEmail = await utils.generateRandomData("email");

    const registrationPage = poManager.getToolshopRegistrationPage();
    const loginPage = poManager.getToolshopLoginPage();

    await registrationPage.goto();
    await registrationPage.registerUser(registrationData.validUser, uniqueEmail);
    await registrationPage.verifyRegistrationSuccess();
    await loginPage.goto();
    await loginPage.login(uniqueEmail, registrationData.validUser.password);
    await loginPage.verifyLoginSuccess(registrationData.validUser.firstName);
  });

  test("AC2: Browse products, update cart, COD checkout and view invoice @regression", async ({ page }) => {
    await utils.addTestAnnotationsByKeyword("ac2_ui");

    const productPage = poManager.getToolshopProductPage();
    const cartPage = poManager.getToolshopCartPage();
    const checkoutPage = poManager.getToolshopCheckoutPage();
    const invoicePage = poManager.getToolshopInvoicePage();
    const loginPage = poManager.getToolshopLoginPage();

    await productPage.goto();
    await productPage.verifyProductsVisible();
    await productPage.addMultipleProductsToCart(2);
    await productPage.goToCart();

    await cartPage.verifyCartHasItems(2);
    await cartPage.updateItemQuantity(0, 2);
    await cartPage.updateItemQuantity(1, 1);
    await cartPage.verifyCartQuantity(0, 2);
    await cartPage.proceedToCheckout();

    await checkoutPage.fillBillingDetails(billingData.billing);
    await checkoutPage.selectCashOnDelivery();
    await checkoutPage.confirmOrderTwice();
    await checkoutPage.verifyOrderSuccess();

    await loginPage.openProfileMenu();
    await invoicePage.openInvoicesPage();
    await invoicePage.verifyInvoiceVisible();
    await invoicePage.openFirstInvoice();
    await invoicePage.verifyInvoiceDetailsVisible();

    await page.context().storageState({ path: "./storeBrowserState.json" });
    console.log("AC2 UI passed: E2E purchase flow and invoice verification completed");
  });
});
