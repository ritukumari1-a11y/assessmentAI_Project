const { test, expect } = require("@playwright/test");
const { commonMethods } = require("../../API/utilities/apiHelper");
const { _Response } = require("../../API/testdata/commonAPIResponse");
const { toolshopData } = require("../../API/utilities/toolshopDynamicData");
const authPage = require("../../API/pageobjects/toolshop/toolshopAuthPage");
const productPage = require("../../API/pageobjects/toolshop/toolshopProductPage");
const registrationData = require("../../UI/resources/data/toolshop/registrationData.json");

/**
 * TC-API-010: Search products via API query parameter.
 */
test.describe("API AC2: Product Search", () => {
  let apiClient;

  test.beforeAll(async () => {
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
  });

  test("TC-API-010: GET /products?search returns filtered list @regression", async () => {
    test.info().annotations.push({ type: "test_key", description: "QA-API-AC2-SEARCH" });

    const searchTerm = "pliers";
    const response = await apiClient.GetResponse(
      productPage.getProductsSearchEndpoint(searchTerm),
      productPage.authHeader()
    );
    expect(response.status()).toBe(_Response.getPositive);

    const body = await response.json();
    expect(body.data.length).toBeGreaterThan(0);
    const matchFound = body.data.some((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    expect(matchFound).toBeTruthy();

    console.log("TC-API-010 passed: API product search verified");
  });
});
