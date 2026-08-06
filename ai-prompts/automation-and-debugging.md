# AI Prompts – Automation and Debugging

Prompts used for Prism Playwright automation structure, page objects, assertions, and analyzing failures/logs. Automation phase used Cursor with focus on matching existing Prism patterns in `prism_playwright/`.

---

## Entry 1 — Prism page object structure for Toolshop UI (Phase 3)

- **Prompt:** Create Toolshop UI page objects following existing Prism Playwright structure. Integrate into central `POManager`. Pages needed: registration, login, product listing, cart, checkout (with double confirm), invoice. Use `data-test` locators where available.
- **AI Response Summary:** Created `UI/pageobjects/toolshop/`:
  | Page object | Key methods |
  |-------------|-------------|
  | `toolshopRegistrationPage.js` | `goto()`, `registerUser()`, `verifyRegistrationSuccess()` |
  | `toolshopLoginPage.js` | `goto()`, `login()`, `verifyLoginSuccess()`, `verifyProfileInformation()`, `verifyLoginFailure()` |
  | `toolshopProductPage.js` | `goto()`, `verifyProductsVisible()`, `addMultipleProductsToCart()`, `searchProduct()` |
  | `toolshopCartPage.js` | `verifyCartHasItems()`, `updateItemQuantity()`, `proceedToCheckout()` |
  | `toolshopCheckoutPage.js` | `fillBillingDetails()`, `selectCashOnDelivery()`, `confirmOrderTwice()` |
  | `toolshopInvoicePage.js` | `openInvoicesPage()`, `verifyInvoiceVisible()`, `openFirstInvoice()` |
  Added getters to `POManager.js`: `getToolshopRegistrationPage()`, `getToolshopLoginPage()`, etc.
- **Debugging Outcome:** Initial import path in API auth page pointed to wrong relative path for `registrationData.json`; fixed to `../../../UI/resources/data/toolshop/registrationData.json`.

---

## Entry 2 — API page objects and apiHelper integration (Phase 3)

- **Prompt:** Create Toolshop API page objects for auth, cart, product, and invoice endpoints. Reuse `commonMethods` from `API/utilities/apiHelper.js` and `toolshopDynamicData` for cross-step state (token, cartId).
- **AI Response Summary:** Created `API/pageobjects/toolshop/`:
  | Page object | Endpoints / helpers |
  |-------------|---------------------|
  | `toolshopAuthPage.js` | `POST users/register`, `POST users/login`, `buildRegisterPayload()`, `generateUniqueEmail()` |
  | `toolshopCartPage.js` | `POST carts`, `POST carts/{id}`, `GET carts/{id}`, `authHeader()` |
  | `toolshopProductPage.js` | `GET products`, `GET products?search=` |
  | `toolshopInvoicePage.js` | `POST invoices`, payload builder from `invoicePayload.json` |
  `toolshopDynamicData.js` singleton holds `accessToken`, `cartId`, `productId`, `invoiceId` across steps within a spec.
- **Debugging Outcome:** API requests logged as curl strings via `requestToCurlLogger` — useful for comparing against Swagger docs at `api.practicesoftwaretesting.com/api/documentation`.

---

## Entry 3 — AC-based spec files and Playwright config (Phase 3)

- **Prompt:** Remove legacy sample tests. Create AC-based spec files under `tests/UI Test/` and `tests/API Test/`. Configure `testcases_regression` Playwright project with trace/video on failure, Allure reporter, `workers: 1`.
- **AI Response Summary:** Final spec inventory:
  ```
  tests/UI Test/
    userRegistrationLogin.spec.js    (AC1 + negative)
    endToEndPurchaseFlow.spec.js     (AC2)
    productSearch.spec.js            (TC-UI-013)
  tests/API Test/
    userAuthCartCreation.spec.js     (API AC1 + negative)
    productInvoiceGeneration.spec.js (API AC2 + negative)
    productSearch.spec.js            (TC-API-010)
  ```
  `playwright.config.js`: `testDir: ./tests`, project `testcases_regression`, reporters HTML + list + allure-playwright, `trace: retain-on-failure`, `video: retain-on-failure`, `slowMo: 300`.
- **Debugging Outcome:** `npx playwright test --list` confirms **6 spec files / 9 tests**. Legacy specs removed so assessment scope is clear for reviewers.

---

## Entry 4 — Double confirm for invoice generation (Phase 3 debugging)

- **Prompt:** AC2 UI checkout fails — order does not complete after single confirm click. Assessment doc says press confirm twice to generate invoice. Fix checkout page object and spec.
- **AI Response Summary:** Implemented `confirmOrderTwice()` in `toolshopCheckoutPage.js`:
  - Waits for visible `[data-test="confirm"]` or `[data-test="finish"]` button
  - Listens for successful `POST invoices` response
  - Clicks confirm, waits 1s, clicks confirm again
  - `verifyOrderSuccess()` checks order success message / invoice number text
  Spec calls: `checkoutPage.confirmOrderTwice()` before `verifyOrderSuccess()`.
- **Debugging Outcome:** AC2 UI test passed end-to-end (~51s). This was the highest-impact debugging item — without double confirm, invoice never appears in My Invoices.

---

## Entry 5 — Missing npm dependencies (Phase 3 debugging)

- **Prompt:** `npx playwright test --list` fails with module not found errors when loading UI tests. Identify and fix missing packages from legacy Prism framework imports.
- **AI Response Summary:** Missing packages pulled in by legacy utilities: `pdf-lib`, `sharp`, `sharp-pdf`, `csv-parse`. Installed via `npm install`. Also required `npm install` for core Playwright and `@faker-js/faker`.
- **Debugging Outcome:** Test listing and execution no longer blocked by legacy import chain (`loggerUtil`, `utils.js` PDF helpers). Assessment tests run independently of unused legacy features.

---

## Entry 6 — Selector and locator tuning (Phase 3 debugging)

- **Prompt:** UI tests flaky on profile menu and checkout proceed buttons. Use maintainable locators with fallbacks for PracticeSoftwareTesting DOM.
- **AI Response Summary:** Locator strategy:
  - Primary: `[data-test="..."]` attributes (street, city, confirm, finish, order-success)
  - Fallback: `getByRole("button", { name: /proceed to checkout/i })` for multi-step checkout
  - Profile: menu navigation with text matchers for first/last name and email
  - Order success: `[data-test="order-success"]` OR text `/thanks for your order|invoice number is/i`
- **Debugging Outcome:** Reduced flakiness on checkout billing → payment → confirm flow. Trace zip available on failure via `npx playwright show-trace <path>`.

---

## Entry 7 — UI ffmpeg / browser binary failure (Phase 4 debugging)

- **Prompt:** Full suite run — all 5 API tests pass but 4 UI tests fail immediately with: `Executable doesn't exist at .../ffmpeg-mac`. How to fix on macOS?
- **AI Response Summary:** Playwright video capture requires ffmpeg binary. UI tests also need Chromium installed. Fix:
  ```bash
  npx playwright install chromium
  PLAYWRIGHT_CHANNEL=chrome npm test
  ```
  `PLAYWRIGHT_CHANNEL=chrome` uses system Chrome when bundled Chromium has issues on macOS.
- **Debugging Outcome:** After install, **9 passed / 0 failed** in 1.8m. Documented in `execution-evidence/EXECUTION-SUMMARY.md` and `readme.md` prerequisites.

---

## Entry 8 — API negative test status codes (Phase 4 debugging)

- **Prompt:** API negative tests — should we assert exact 401 or accept any 4xx? SUT returns different codes for invalid login vs invalid cart.
- **AI Response Summary:** Assert flexible 4xx range for negatives:
  ```javascript
  expect(loginResponse.status()).toBeGreaterThanOrEqual(400);
  expect(loginResponse.status()).toBeLessThan(500);
  ```
  Invalid login → 401 observed. Invalid cart_id on invoice → 404 observed.
- **Debugging Outcome:** Negative tests stable across SUT response variations. Positive tests still assert exact expected codes via `_Response` constants.

---

## Entry 9 — Execution evidence and reporting (Phase 4)

- **Prompt:** Run full regression suite and document execution evidence for assessment submission. Where do reports and logs land?
- **AI Response Summary:** Post-run artifacts:
  | Artifact | Path |
  |----------|------|
  | Playwright HTML report | `prism_playwright/playwright-report/` |
  | Allure raw results | `prism_playwright/allure-results/` |
  | Execution summary | `prism_playwright/execution-evidence/EXECUTION-SUMMARY.md` |
  | Winston logs | `prism_playwright/executionResultLogs.log` |
  | API curl log | `prism_playwright/API/testdata/api_requests.log` |
  | Trace / screenshot | `prism_playwright/test-results/` (on failure) |
  Commands: `npm test`, `npm run report`, `npm run test:allure` + `npm run allure:open`.
- **Debugging Outcome:** Final run **9 passed / 0 failed**. All automated test cases show Passed status as required by assessment doc.

---

## Entry 10 — AC1 negative UI test design (Phase 3 debugging)

- **Prompt:** AC1 negative UI test should verify wrong-password login error without re-running full registration UI (slow and redundant). Suggest setup approach.
- **AI Response Summary:** Use API `POST users/register` in negative test setup, then navigate to UI login page with wrong password. Assert `verifyLoginFailure()` — error shown or user remains on login page.
- **Debugging Outcome:** Negative UI test runs in ~5s vs re-registering through UI. Keeps test focused on login error handling (TC-UI-005).
