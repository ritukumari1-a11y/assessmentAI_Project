# AI Prompts – Test Design

Prompts used to generate and refine test scenarios and test cases for UI and API tiers. Each entry maps to rows in `FunctionalTestCase.csv` and automation under `prism_playwright/tests/`.

---

## Entry 1 — Manual test suite structure (Phase 2)

- **Prompt:** Design a manual functional test suite for Toolshop covering AC1 and AC2 (UI + API). Include positive, negative, edge, and non-functional cases. Output as CSV columns: Test ID, AC Reference, Module, Test Type, Category, Priority, Test Scenario, Preconditions, Test Steps, Expected Result, Automation Mapping, Sanity/Regression.
- **AI Response Summary:** Created **27 manual cases** in `FunctionalTestCase.csv`:
  - **UI positive:** TC-UI-001–003 (AC1), TC-UI-006–010 (AC2), TC-UI-013 (search)
  - **UI negative/edge:** TC-UI-004, TC-UI-005, TC-UI-011, TC-UI-012
  - **API positive:** TC-API-001–003 (API AC1), TC-API-005–008 (API AC2), TC-API-010 (search)
  - **API negative:** TC-API-004, TC-API-009
  - **NFR:** TC-NFR-001–003 (performance, security, usability)
  Each row includes `Automation Mapping` column pointing to spec file or `Manual only`.
- **Validation Notes:** AC1 split into three CSV rows (register, login, profile) while automated as one E2E test for maintainability. Negative validation and NFR cases intentionally kept manual-only to stay within automation scope.

---

## Entry 2 — UI AC1 test scenarios (Phase 2)

- **Prompt:** Design UI test scenarios for AC1: User Registration & Login. Cover register with valid details, login with registered credentials, verify profile (first name, last name, email). Add one negative: login with wrong password. Tag sanity and regression appropriately.
- **AI Response Summary:**
  | Scenario | CSV IDs | Automation | Tags |
  |----------|---------|------------|------|
  | Register + login + profile E2E | TC-UI-001, TC-UI-002, TC-UI-003 | `userRegistrationLogin.spec.js` | `@sanity @regression` |
  | Login with incorrect password | TC-UI-005 | Same spec, second test | `@regression` |
  Negative test uses **API registration as setup** then asserts UI login failure — keeps focus on login error handling without duplicating registration UI steps.
- **Validation Notes:** Profile verification via `loginPage.verifyProfileInformation()`. Dynamic email from `utils.generateRandomData("email")` in `beforeEach`. Browser state saved to `storeBrowserState.json` after positive AC1.

---

## Entry 3 — UI AC2 test scenarios (Phase 2)

- **Prompt:** Design UI test scenarios for AC2: End-to-End Purchase Flow. Must include browse products, add at least two products, update cart quantities, COD checkout, **press confirm button twice** for invoice, and verify invoice under My Invoices.
- **AI Response Summary:** Single E2E regression test in `endToEndPurchaseFlow.spec.js` covering TC-UI-006 through TC-UI-010:
  1. `beforeEach`: register + login (setup)
  2. `productPage.verifyProductsVisible()` — browse
  3. `addMultipleProductsToCart(2)` — multiple items
  4. `updateItemQuantity(0, 2)` / `verifyCartQuantity(0, 2)` — quantity update
  5. `fillBillingDetails(billingData.billing)` + `selectCashOnDelivery()` + `confirmOrderTwice()` — COD + double confirm
  6. `invoicePage.openInvoicesPage()` → `verifyInvoiceVisible()` → `openFirstInvoice()` → `verifyInvoiceDetailsVisible()`
  Tagged `@regression` only (AC2 is not smoke).
- **Validation Notes:** Checkout negative (TC-UI-011) and cart edge (TC-UI-012) left manual. Double-confirm behavior validated against live app — first click alone does not complete invoice.

---

## Entry 4 — API AC1 test scenarios (Phase 2)

- **Prompt:** Design API test scenarios for API AC1: User Authentication & Cart Creation. Cover POST register, POST login (bearer token), POST cart. Include negative login with invalid credentials. Use Prism `commonMethods` and toolshop API page objects.
- **AI Response Summary:**
  | Scenario | CSV IDs | Spec | Tags |
  |----------|---------|------|------|
  | Register → login → token → cart | TC-API-001, TC-API-002, TC-API-003 | `userAuthCartCreation.spec.js` | `@sanity @regression` |
  | Invalid login returns 4xx | TC-API-004 | Same spec | `@regression` |
  Endpoints via `toolshopAuthPage.js` and `toolshopCartPage.js`. Token and cart ID stored in `toolshopDynamicData` singleton for downstream API AC2 tests.
- **Validation Notes:** Status assertions use `_Response.postPositive` / `_Response.getPositive` from `commonAPIResponse.js`. Negative test accepts any 4xx (401 observed on SUT).

---

## Entry 5 — API AC2 test scenarios (Phase 2)

- **Prompt:** Design API test scenarios for API AC2: Product Selection & Invoice Generation. Cover GET products, POST add-to-cart, GET cart verification, POST invoice with assessment example payload. Add negative: invoice with invalid cart_id.
- **AI Response Summary:**
  | Scenario | CSV IDs | Spec | Tags |
  |----------|---------|------|------|
  | Full product → cart → invoice lifecycle | TC-API-005–008 | `productInvoiceGeneration.spec.js` | `@regression` |
  | Invalid cart_id on invoice POST | TC-API-009 | Same spec | `@regression` |
  `beforeAll` prepares authenticated user, token, and cart. Invoice payload from `API/testdata/toolshop/invoicePayload.json` matches assessment example (`billing_country: TG`, `payment_method: cash-on-delivery`, `payment_details: {}`).
- **Validation Notes:** Cart must contain items before invoice POST (empty cart risk from `project-info.md`). API curl logged via `requestToCurlLogger` → `API/testdata/api_requests.log`.

---

## Entry 6 — Product search scenarios (Phase 2)

- **Prompt:** Add UI and API product search test cases (keyword filter). Map to FunctionalTestCase.csv and create automation specs following existing Toolshop page object patterns.
- **AI Response Summary:**
  | Scenario | CSV ID | Spec | Method |
  |----------|--------|------|--------|
  | UI search by keyword "pliers" | TC-UI-013 | `productSearch.spec.js` | Search field on home after login |
  | API GET `/products?search=pliers` | TC-API-010 | `API Test/productSearch.spec.js` | Bearer token from register/login setup |
  Both tagged `@regression`.
- **Validation Notes:** UI test registers and logs in user in `beforeEach` (same pattern as AC2). API test asserts filtered list contains matching product name.

---

## Entry 7 — Sanity vs regression tagging and npm scripts (Phase 2)

- **Prompt:** Categorize all automated tests as sanity or regression per assessment guidance. Provide npm commands for smoke and full regression runs.
- **AI Response Summary:**
  - **Sanity (`@sanity`):** 2 tests — UI AC1 positive + API AC1 positive
  - **Regression (`@regression`):** 9 tests total (all specs)
  - **Commands:** `npm run test:smoke` (`--grep @sanity`), `npm run test:regression` (`--grep @regression`), `npm test` (full suite)
  Playwright project: `testcases_regression` in `playwright.config.js` matching `tests/UI Test/**/*.spec.js` and `tests/API Test/**/*.spec.js`.
- **Validation Notes:** CSV Sanity/Regression column aligned with tags. Smoke suite validates connectivity and core auth paths before running longer AC2 UI E2E (~50s).

---

## Entry 8 — Traceability: requirements → CSV → automation (Phase 2 review)

- **Prompt:** Verify traceable mapping from assessment ACs to manual CSV rows to automated specs. List any gaps.
- **AI Response Summary:** Traceability chain:
  ```
  Assessment AC1/AC2 → FunctionalTestCase.csv (Automation Mapping column)
                    → testCasesMeta.json (Xray keys)
                    → spec files with utils.addTestAnnotationsByKeyword()
  ```
  **Gaps (intentional manual-only):** invalid email registration, empty billing checkout, duplicate cart item, NFR performance/security/responsive checks.
- **Validation Notes:** No orphaned automated tests — every spec maps to at least one CSV row. `prism_playwright/ASSESSMENT-COVERAGE.md` documents full matrix for reviewers.
