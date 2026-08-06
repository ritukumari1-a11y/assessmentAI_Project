# AI Prompts – Test Data

Prompts used to design, generate, and validate test data for UI and API Toolshop automation. Aligned with `prism_playwright/TEST-DATA-STRATEGY.md` and assessment invoice POST example.

**Principles applied:** unique emails per run, static JSON for stable fields, no secrets in repo, UI billing vs API invoice country codes intentionally differ per SUT requirements.

---

## Entry 1 — Registration JSON for UI and API (Phase 2)

- **Prompt:** Create shared registration test data for Toolshop UI registration page and API `POST users/register`. Include valid user profile, address, and invalid user stub for manual negative cases. Store under Prism `UI/resources/data/toolshop/`.
- **AI Response Summary:** Created `prism_playwright/UI/resources/data/toolshop/registrationData.json`:
  ```json
  "validUser": {
    "firstName": "QA", "lastName": "Automation",
    "password": "PracticeQa!2026SecureXyZ",
    "dob": "1990-05-15", "phone": "0987654321",
    "address": { "street": "Zoey Shore", "city": "Hesselbury", ... "countryCode": "US", "postal_code": "33101", "house_number": "42" }
  }
  ```
  API `buildRegisterPayload(email)` in `toolshopAuthPage.js` reads from this JSON — single source for UI/API password and address fields.
- **Validation Notes:** Password is strong and shared across all specs. `invalidUser` block supports manual TC-UI-004 (invalid email format) without automation. Address aligns with assessment billing street/city/state names.

---

## Entry 2 — Dynamic email strategy (Phase 2)

- **Prompt:** Registration fails when the same email is reused. Design a dynamic email strategy for UI and API tests that avoids collisions across parallel or repeat runs.
- **AI Response Summary:** Two generators, same pattern:
  | Layer | Generator | Pattern |
  |-------|-----------|---------|
  | UI specs | `utils.generateRandomData("email")` in `commonUtils/utils.js` | `qa.automation.{random}@mailinator.com` |
  | API specs | `authPage.generateUniqueEmail()` in `toolshopAuthPage.js` | `qa.automation.{faker8}@mailinator.com` |
  Called in `beforeEach` (UI) or `beforeAll`/`beforeEach` (API). Combined with `workers: 1` in `playwright.config.js`.
- **Validation Notes:** `@mailinator.com` accepted by Toolshop registration. No duplicate-email failures in full regression run (9 passed). Emails are disposable — safe for public SUT.

---

## Entry 3 — Billing data for UI COD checkout (Phase 2)

- **Prompt:** Create checkout billing test data for AC2 UI E2E — Cash on Delivery, US address fields matching registration data street/city/state. File for `toolshopCheckoutPage.fillBillingDetails()`.
- **AI Response Summary:** Created `prism_playwright/UI/resources/data/toolshop/billingData.json`:
  ```json
  "billing": {
    "street": "Zoey Shore", "city": "Hesselbury", "state": "Florida",
    "country": "United States", "countryCode": "US",
    "postal_code": "33101", "house_number": "42",
    "payment_method": "cash-on-delivery"
  }
  ```
  Used in `endToEndPurchaseFlow.spec.js` → `checkoutPage.fillBillingDetails(billingData.billing)`.
- **Validation Notes:** UI checkout requires US postal `33101` and `countryCode: US` for form validation. `house_number` field filled when locator present on checkout page.

---

## Entry 4 — API invoice payload per assessment example (Phase 2)

- **Prompt:** Create API invoice POST payload matching the QA Practical Assessment docx example. Fields: billing_street, billing_city, billing_state, billing_country `TG`, billing_postal_code `1234AA`, payment_method `cash-on-delivery`, empty payment_details, dynamic cart_id.
- **AI Response Summary:** Created `prism_playwright/API/testdata/toolshop/invoicePayload.json`:
  ```json
  "invoicePayload": {
    "billing_street": "Zoey Shore", "billing_city": "Hesselbury",
    "billing_state": "Florida", "billing_country": "TG",
    "billing_postal_code": "1234AA", "payment_method": "cash-on-delivery",
    "payment_details": {}
  }
  ```
  `toolshopInvoicePage.js` merges template with runtime `cart_id` from `toolshopData.cartId` before POST.
- **Validation Notes:** Cross-checked against assessment docx invoice example. API invoice uses `TG` / `1234AA` (assessment spec); UI billing uses `US` / `33101` (SUT form rules) — intentional split documented in `TEST-DATA-STRATEGY.md`.

---

## Entry 5 — Runtime dynamic data singleton (Phase 3)

- **Prompt:** API AC2 needs access_token, cart_id, product_id, and invoice_id across multiple steps in one spec. Design runtime test data storage following Prism patterns — no hardcoded IDs.
- **AI Response Summary:** Implemented `prism_playwright/API/utilities/toolshopDynamicData.js` singleton:
  | Property | Set by | Used by |
  |----------|--------|---------|
  | `userEmail` | Auth setup | Logging / traceability |
  | `accessToken` | POST login response | All authenticated API calls via `authHeader()` |
  | `cartId` | POST carts response | Add-to-cart, GET cart, invoice POST |
  | `productId` | GET products (first in-stock) | POST carts/{id} body |
  | `invoiceId` | POST invoices response | Optional downstream assertions |
  Imported as `{ toolshopData }` in API specs and page objects.
- **Validation Notes:** `productInvoiceGeneration.spec.js` uses `beforeAll` to populate token + cart once; individual tests read from singleton. Avoids re-registering for each API AC2 test.

---

## Entry 6 — Dynamic product selection (Phase 3)

- **Prompt:** Product IDs change on the live SUT. How should API and UI tests select products without hardcoding IDs in JSON files?
- **AI Response Summary:**
  - **API:** `GET /products` → pick first product with stock; store `toolshopData.productId`; POST to cart with `quantity: 2`
  - **UI:** `addMultipleProductsToCart(2)` adds first two visible product cards from listing page
  - **Search tests:** keyword `pliers` — stable product name on Toolshop catalog
- **Validation Notes:** No product IDs in static JSON. API AC2 and UI AC2 pass against live catalog. Search keyword chosen because Toolshop consistently lists pliers products.

---

## Entry 7 — Environment assumptions and secrets (Phase 2)

- **Prompt:** What test data and config should live in `.env` vs JSON files? What must not be committed?
- **AI Response Summary:**
  | Item | Location | Notes |
  |------|----------|-------|
  | SUT URLs | `.env` (from `.env.example`) | `TOOLSHOP_BASE_URL`, `TOOLSHOP_API_URL`, `URL` |
  | User passwords | `registrationData.json` | Test-only password, not production |
  | API keys / DB creds | `.env.example` placeholders only | Legacy Prism fields; not used by assessment tests |
  | Generated logs | `api_requests.log`, `executionResultLogs.log` | Gitignored or regenerated each run |
  `.gitignore` excludes `.env`, `playwright-report/`, `test-results/`, `allure-results/`.
- **Validation Notes:** Assessment doc: do not share production credentials with AI. Only public SUT URLs and disposable test emails used in prompts.

---

## Entry 8 — Test data validation via execution (Phase 4)

- **Prompt:** Verify all test data files work end-to-end — registration, billing, invoice payload, dynamic emails. Confirm API curl log shows correct payloads.
- **AI Response Summary:** Full run `PLAYWRIGHT_CHANNEL=chrome npm test` — **9 passed / 0 failed**. `API/testdata/api_requests.log` shows:
  - Register payloads with unique `@mailinator.com` emails
  - Invoice POST with `billing_country: TG`, `payment_method: cash-on-delivery`, valid `cart_id`
  - Product search `GET /products?search=pliers`
- **Validation Notes:** Data strategy documented in `prism_playwright/TEST-DATA-STRATEGY.md`. Execution summary in `execution-evidence/EXECUTION-SUMMARY.md` confirms no data-collision or payload rejection failures.

---

## Entry 9 — Manual test data for CSV-only cases (Phase 2)

- **Prompt:** What test data is needed for manual-only cases in FunctionalTestCase.csv (invalid email, empty billing, NFR)?
- **AI Response Summary:**
  | CSV ID | Data approach |
  |--------|---------------|
  | TC-UI-004 | `registrationData.json` → `invalidUser.email: "invalid-email"` |
  | TC-UI-011 | Empty billing fields — no file; tester leaves form blank |
  | TC-UI-012 | Same product added twice — use any valid product from UI |
  | TC-NFR-001–003 | No static data — manual timing/viewport checks |
  Not automated — data documented in CSV preconditions column.
- **Validation Notes:** Keeps automation data files focused on positive/negative paths that are automated. Manual cases reference same SUT URLs as automation.
