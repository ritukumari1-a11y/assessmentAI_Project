# QA AI Capability Exercise — Project Info

**Primary AI Tool(s) Used:** Cursor AI (Composer Agent)

**Application Under Test:** PracticeSoftwareTesting Toolshop — Checkout & Application Flow

- UI: https://practicesoftwaretesting.com/
- API: https://api.practicesoftwaretesting.com/api/documentation

**Assessment Start Date:** July 10, 2026  
**Submission Date:** July 10, 2026

---

## Project Summary

This project automates the PracticeSoftwareTesting Toolshop ecommerce application using the Prism Playwright framework. The focus is on two core acceptance criteria flows: **AC1 (User Registration & Login)** and **AC2 (End-to-End Purchase Flow)** for UI, plus matching API lifecycle tests for authentication, cart, product selection, and invoice generation.

---

## Tools Used

| Category | Tools |
|----------|-------|
| Browser automation | Playwright 1.40, Chromium |
| Framework | Prism Playwright (Page Object Model) |
| API testing | Playwright API request context |
| AI assistant | Cursor AI |
| Test data | JSON files, Faker (dynamic emails) |
| Reporting | Playwright HTML report, Allure report |
| Environment | Node.js, dotenv |

---

## Acceptance Criteria Coverage

### UI AC1: User Registration & Login
The user registers with valid details, logs in with registered credentials, and verifies profile information. Includes negative test for login with incorrect password.

- **Automation:** `prism_playwright/tests/UI Test/userRegistrationLogin.spec.js`
- **Tags:** `@sanity`, `@regression`

### UI AC2: End-to-End Purchase Flow
Browse products, add multiple items, update quantity, checkout with Cash on Delivery, confirm twice, view invoice under My Invoices.

- **Automation:** `prism_playwright/tests/UI Test/endToEndPurchaseFlow.spec.js`
- **Tags:** `@regression`

### API AC1: User Authentication & Cart Creation
Register via API, login, obtain bearer token, create cart. Includes negative test for invalid login credentials.

- **Automation:** `prism_playwright/tests/API Test/userAuthCartCreation.spec.js`
- **Tags:** `@sanity`, `@regression`

### API AC2: Product Selection & Invoice Generation
Retrieve products, add to cart, verify cart, generate invoice. Includes negative test for invalid cart ID on invoice.

- **Automation:** `prism_playwright/tests/API Test/productInvoiceGeneration.spec.js`
- **Tags:** `@regression`

---

## Setup Summary

### 1. Project and SUT context provided to AI
Shared the QA Practical Assessment docx, existing Prism folder structure, SUT URLs, AC definitions, and framework conventions (POM, apiHelper, dotenv).

### 2. Requirement analysis with AI
AI extracted AC1/AC2 UI and API flows, sanity vs regression scope, invoice double-confirm rule, and required submission artifacts.

### 3. Test planning and strategy
- **Smoke (@sanity):** AC1 UI + API AC1
- **Regression (@regression):** AC2 UI + API AC2 + negative/edge manual cases in CSV
- **UI vs API:** Balanced coverage with traceable mapping in `FunctionalTestCase.csv`

### 4. Manual test case design
Functional, negative, edge, and non-functional cases documented in `FunctionalTestCase.csv` with automation mapping.

### 5. Automation design
Reused Prism patterns: `POManager` (with Toolshop getters), API page objects, `commonMethods` apiHelper, `toolshopDynamicData` for token/cart state, JSON test data under `UI/resources/data/toolshop/`.

### 6. Validation and refinement of AI output
Reviewed generated page objects, consolidated legacy sample tests into AC-based specs, verified test discovery via `npx playwright test --list`, and installed missing dependencies.

### 7. Test data generation
Dynamic emails via Faker/utils; static billing and registration data in JSON; API invoice payload aligned with assessment example.

### 8. Debugging approach
Use Playwright trace/screenshot on failure, `executionResultLogs.log`, HTML report, and API curl logs via `requestToCurlLogger`.

### 9. Information not shared with AI
Production credentials, internal client data, API secrets, or proprietary business logic unrelated to the public SUT.

### 10. Reuse in real projects
Same workflow: provide SUT context → derive ACs → manual CSV → POM automation → tag smoke/regression → document prompts → execute and iterate on failures.

---

## Requirement and Risk Analysis

### Application scope
The Toolshop application covers user registration, authentication, product browsing, cart management, Cash on Delivery checkout, and invoice generation. Both UI and API layers must stay in sync for a complete purchase lifecycle.

### Identified risks

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Duplicate email registration failures | High | High | Dynamic email per test run via Faker/utils |
| Invoice requires double-confirm on UI | High | Medium | `confirmOrderTwice()` in checkout page object; documented in readme |
| Bearer token expiry during API tests | Medium | Low | Short test suites; token obtained immediately before use |
| Flaky UI selectors on SUT updates | Medium | Medium | `data-test` attributes with fallback locators; trace/video on failure |
| API rate limiting or SUT downtime | High | Low | Retry policy in CI; smoke suite runs first to validate connectivity |
| Test data collision across parallel runs | Medium | Medium | `workers: 1` in playwright.config.js; unique emails per run |
| Negative API responses vary (401 vs 422) | Low | Medium | Assertions accept any 4xx status for invalid credentials |
| Empty cart invoice generation | Medium | Low | API AC2 verifies cart has items before invoice POST |

### Test priority based on risk
- **Sanity (P0):** Registration, login, cart creation — blocks all downstream flows
- **Regression (P1):** Full purchase flow, invoice generation, negative UI login, negative API auth/invoice
- **Manual only (P2):** UI validation errors, product search, edge cases, non-functional checks

---

## Repository Structure

```
qa-ai-practical-assessment/
├── FunctionalTestCase.csv
├── project-info.md
├── readme.md
├── ai-prompts/
└── prism_playwright/
    ├── tests/
    │   ├── UI Test/       # AC1 & AC2 UI automation
    │   └── API Test/      # API AC1 & AC2 automation
    ├── UI/pageobjects/toolshop/
    ├── API/pageobjects/toolshop/
    └── playwright.config.js
```
