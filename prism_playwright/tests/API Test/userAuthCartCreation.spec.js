const { test, expect } = require("@playwright/test");
const { commonMethods } = require("../../API/utilities/apiHelper");
const { _Response } = require("../../API/testdata/commonAPIResponse");
const { toolshopData } = require("../../API/utilities/toolshopDynamicData");
const authPage = require("../../API/pageobjects/toolshop/toolshopAuthPage");
const cartPage = require("../../API/pageobjects/toolshop/toolshopCartPage");
const suiteInfo = require("../../API/utilities/requestToCurlLogger");
const registrationData = require("../../UI/resources/data/toolshop/registrationData.json");

/**
 * API AC1: User Authentication & Cart Creation
 * A new user should be able to register via API, log in with registered credentials,
 * obtain a valid bearer token, and create a new cart successfully.
 */
test.describe("API AC1: User Authentication & Cart Creation", () => {
  let apiClient;
  let userEmail;

  test.beforeAll(async () => {
    suiteInfo.suiteStarter();
  });

  test.beforeEach(async () => {
    apiClient = new commonMethods();
    userEmail = authPage.generateUniqueEmail();
    toolshopData.userEmail = userEmail;
  });

  test("API AC1: Register, login, obtain bearer token and create cart @sanity @regression", async () => {
    test.info().annotations.push({ type: "test_key", description: "QA-API-AC1" });

    const registerResponse = await apiClient.PostResponse(
      authPage.registerEndpoint,
      authPage.buildRegisterPayload(userEmail),
      authPage.registerHeader
    );
    expect(registerResponse.status()).toBe(_Response.postPositive);

    const loginResponse = await apiClient.PostResponse(
      authPage.loginEndpoint,
      authPage.buildLoginPayload(userEmail, registrationData.validUser.password),
      authPage.loginHeader
    );
    expect(loginResponse.status()).toBe(_Response.getPositive);

    const loginBody = await loginResponse.json();
    expect(loginBody.access_token).toBeTruthy();
    toolshopData.accessToken = loginBody.access_token;

    const cartResponse = await apiClient.PostResponse(
      cartPage.createCartEndpoint,
      {},
      cartPage.authHeader()
    );
    expect(cartResponse.status()).toBe(_Response.postPositive);

    const cartBody = await cartResponse.json();
    expect(cartBody.id).toBeTruthy();
    toolshopData.cartId = cartBody.id;

    console.log("API AC1 passed: auth and cart creation verified");
  });

  test("API AC1 negative: Login with invalid credentials returns 4xx @regression", async () => {
    test.info().annotations.push({ type: "test_key", description: "QA-API-AC1-NEG" });

    const loginResponse = await apiClient.PostResponse(
      authPage.loginEndpoint,
      authPage.buildLoginPayload("nonexistent.user@mailinator.com", "WrongPassword!99"),
      authPage.loginHeader
    );

    expect(loginResponse.status()).toBeGreaterThanOrEqual(400);
    expect(loginResponse.status()).toBeLessThan(500);
    console.log(`API AC1 negative passed: invalid login returned ${loginResponse.status()}`);
  });
});
