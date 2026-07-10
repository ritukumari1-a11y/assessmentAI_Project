const { test, expect } = require("@playwright/test");
const { commonMethods } = require("../../API/utilities/apiHelper");
const { _Response } = require("../../API/testdata/commonAPIResponse");
const { toolshopData } = require("../../API/utilities/toolshopDynamicData");
const authPage = require("../../API/pageobjects/toolshop/toolshopAuthPage");
const cartPage = require("../../API/pageobjects/toolshop/toolshopCartPage");
const productPage = require("../../API/pageobjects/toolshop/toolshopProductPage");
const invoicePage = require("../../API/pageobjects/toolshop/toolshopInvoicePage");
const suiteInfo = require("../../API/utilities/requestToCurlLogger");
const registrationData = require("../../UI/resources/data/toolshop/registrationData.json");

/**
 * API AC2: Product Selection & Invoice Generation
 * Using the bearer token, the user should retrieve products, add selected products
 * to the cart, verify cart contents, and successfully generate an invoice.
 */
test.describe("API AC2: Product Selection & Invoice Generation", () => {
  let apiClient;

  test.beforeAll(async () => {
    suiteInfo.suiteStarter();
    apiClient = new commonMethods();

    const userEmail = authPage.generateUniqueEmail();
    toolshopData.userEmail = userEmail;

    await apiClient.PostResponse(
      authPage.registerEndpoint,
      authPage.buildRegisterPayload(userEmail),
      authPage.registerHeader
    );

    const loginResponse = await apiClient.PostResponse(
      authPage.loginEndpoint,
      authPage.buildLoginPayload(userEmail, registrationData.validUser.password),
      authPage.loginHeader
    );
    const loginBody = await loginResponse.json();
    toolshopData.accessToken = loginBody.access_token;

    const cartResponse = await apiClient.PostResponse(
      cartPage.createCartEndpoint,
      {},
      cartPage.authHeader()
    );
    const cartBody = await cartResponse.json();
    toolshopData.cartId = cartBody.id;
  });

  test("API AC2: Retrieve products, add to cart, verify cart and generate invoice @regression", async () => {
    test.info().annotations.push({ type: "test_key", description: "QA-API-AC2" });

    const productsResponse = await apiClient.GetResponse(
      productPage.getProductsEndpoint,
      productPage.authHeader()
    );
    expect(productsResponse.status()).toBe(_Response.getPositive);

    const productsBody = await productsResponse.json();
    expect(productsBody.data.length).toBeGreaterThan(0);
    toolshopData.productId = productsBody.data[0].id;

    const addToCartResponse = await apiClient.PostResponse(
      cartPage.addToCartEndpoint(toolshopData.cartId),
      cartPage.buildAddToCartPayload(toolshopData.productId, 2),
      cartPage.authHeader()
    );
    expect(addToCartResponse.status()).toBeGreaterThanOrEqual(200);
    expect(addToCartResponse.status()).toBeLessThan(300);

    const getCartResponse = await apiClient.GetResponse(
      cartPage.getCartEndpoint(toolshopData.cartId),
      cartPage.authHeader()
    );
    expect(getCartResponse.status()).toBe(_Response.getPositive);

    const cartBody = await getCartResponse.json();
    expect(cartBody.cart_items.length).toBeGreaterThan(0);
    expect(cartBody.cart_items[0].product.id).toBe(toolshopData.productId);
    expect(cartBody.cart_items[0].quantity).toBe(2);

    const invoicePayload = invoicePage.buildInvoicePayload(toolshopData.cartId);
    const invoiceResponse = await apiClient.PostResponse(
      invoicePage.createInvoiceEndpoint,
      invoicePayload,
      invoicePage.authHeader()
    );
    expect(invoiceResponse.status()).toBe(_Response.postPositive);

    const invoiceBody = await invoiceResponse.json();
    expect(invoiceBody.id).toBeTruthy();
    expect(invoiceBody.billing_street).toBe(invoicePayload.billing_street);
    expect(invoiceBody.billing_city).toBe(invoicePayload.billing_city);
    expect(invoiceBody.billing_state).toBe(invoicePayload.billing_state);
    expect(invoiceBody.billing_country).toBe(invoicePayload.billing_country);
    expect(invoiceBody.billing_postal_code).toBe(invoicePayload.billing_postal_code);
    expect(invoiceBody.invoice_number).toBeTruthy();
    expect(invoiceBody.total).toBeGreaterThan(0);
    toolshopData.invoiceId = invoiceBody.id;

    console.log("API AC2 passed: product selection and invoice generation verified");
  });

  test("API AC2 negative: Generate invoice with invalid cart id returns 4xx @regression", async () => {
    test.info().annotations.push({ type: "test_key", description: "QA-API-AC2-NEG" });

    const invalidCartId = "00000000000000000000000000";
    const invoicePayload = invoicePage.buildInvoicePayload(invalidCartId);
    const invoiceResponse = await apiClient.PostResponse(
      invoicePage.createInvoiceEndpoint,
      invoicePayload,
      invoicePage.authHeader()
    );

    expect(invoiceResponse.status()).toBeGreaterThanOrEqual(400);
    expect(invoiceResponse.status()).toBeLessThan(500);
    console.log(`API AC2 negative passed: invalid cart invoice returned ${invoiceResponse.status()}`);
  });
});
