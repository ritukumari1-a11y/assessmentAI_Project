# AI Prompts – Requirements and Planning

Record of Cursor AI prompts used for understanding the Toolshop application, extracting acceptance criteria, identifying risks, and drafting the test plan. Each entry follows one focused task per chat (iterative prompting per assessment guide).

**SUT context shared with AI:** `QA Practical Assessment (1).docx`, Prism `prism_playwright/` folder structure, UI URL `https://practicesoftwaretesting.com`, API URL `https://api.practicesoftwaretesting.com`, and framework conventions (POM, `apiHelper`, dotenv, `testcases_regression` project).

---

## Entry 1 — Framework readiness check (Phase 1)

- **Prompt:** Analyse the `prism_playwright/` folder and confirm whether Playwright is installed and ready for test execution. List what is missing before we start the QA assessment.
- **AI Response (short summary):** Inspected `package.json`, `playwright.config.js`, and `node_modules`. Playwright 1.40 was declared but browsers were not installed. No `.env` file present — only `.env.example` with placeholder URLs. Legacy Prism dependencies (`pdf-lib`, `sharp`, `csv-parse`) referenced by framework utilities were missing from `node_modules`.
- **Validation Notes:** Ran `npx playwright test --list` before and after setup. Confirmed assessment work should use `TOOLSHOP_BASE_URL` and `TOOLSHOP_API_URL` in `.env`, not legacy `BASE_URL` placeholders.

---

## Entry 2 — Extract acceptance criteria from assessment doc (Phase 1)

- **Prompt:** Read `QA Practical Assessment (1).docx` and extract all UI and API acceptance criteria for PracticeSoftwareTesting Toolshop. Include the invoice double-confirm rule and the example invoice POST body. Output a structured AC list for test planning.
- **AI Response (short summary):** Identified four core AC flows:
  - **UI AC1:** Register → Login → Verify profile
  - **UI AC2:** Browse products → Add multiple items → Update quantity → COD checkout → **Confirm twice** → View invoice under My Invoices
  - **API AC1:** Register → Login → Bearer token → Create cart
  - **API AC2:** GET products → Add to cart → Verify cart → POST invoice with COD payload (`billing_country: TG`, `payment_method: cash-on-delivery`)
  Also noted submission artifacts: `FunctionalTestCase.csv`, `project-info.md`, `readme.md`, `ai-prompts/`, execution reports with all tests Passed.
- **Validation Notes:** Cross-checked against live SUT — invoice generation on UI requires two confirm clicks; documented in AC2 spec comment and `toolshopCheckoutPage.confirmOrderTwice()`.

---

## Entry 3 — Requirement and risk analysis (Phase 1)

- **Prompt:** For PracticeSoftwareTesting Toolshop, perform requirement and risk analysis covering registration, login, cart, checkout, and invoice flows. Map risks to test priority (sanity vs regression).
- **AI Response (short summary):** Key risks identified:
  | Risk | Mitigation |
  |------|------------|
  | Duplicate email on registration | Dynamic email per run via `utils.generateRandomData("email")` and `authPage.generateUniqueEmail()` |
  | Invoice requires double confirm on UI | `confirmOrderTwice()` in checkout page object |
  | Bearer token expiry in API suite | Short suites; token obtained immediately before cart/invoice steps |
  | Flaky UI selectors | `data-test` attributes with fallback locators; trace/video on failure |
  | Parallel test data collision | `workers: 1` in `playwright.config.js` |
  Priority: **Sanity (P0)** = AC1 UI + API AC1; **Regression (P1)** = AC2 + negatives; **Manual (P2)** = validation errors, NFR checks.
- **Validation Notes:** Risk table added to `project-info.md`. Sanity scope limited to `@sanity` tag on AC1 specs only.

---

## Entry 4 — Test planning: UI vs API, smoke vs regression (Phase 1)

- **Prompt:** Create a test plan for the Toolshop assessment using Prism Playwright. Categorize flows as sanity or regression. Define which cases stay manual-only vs automated. Align with 5–8 automated tests per tier guideline.
- **AI Response (short summary):** Test strategy:
  - **Smoke (`@sanity`):** `userRegistrationLogin.spec.js` (AC1 positive) + `userAuthCartCreation.spec.js` (API AC1 positive) — runnable via `npm run test:smoke`
  - **Regression (`@regression`):** AC2 UI/API flows, negative login, invalid cart invoice, product search — runnable via `npm run test:regression`
  - **Manual-only:** TC-UI-004 (invalid email), TC-UI-011 (empty billing), TC-UI-012 (duplicate product), TC-NFR-001–003 (performance, security, usability)
  - **Automation layout:** `tests/UI Test/` and `tests/API Test/` under Playwright project `testcases_regression`
  Final automated count: **9 tests** in **6 spec files** (within scope).
- **Validation Notes:** Strategy reflected in `FunctionalTestCase.csv` Sanity/Regression column and `package.json` npm scripts (`test:smoke`, `test:regression`, `test:ui:ac1`, etc.).

---

## Entry 5 — Submission artifact checklist (Phase 1)

- **Prompt:** From `QA Practical Assessment (1).docx`, list all required repository files and folder structure. Map each requirement to where it lives in this project.
- **AI Response (short summary):** Required structure:
  ```
  qa-ai-practical-assessment/
  ├── FunctionalTestCase.csv
  ├── project-info.md
  ├── readme.md
  ├── ai-prompts/          (requirements, test-design, test-data, automation, documentation)
  └── prism_playwright/    (Prism UI + API automation, reports, test data)
  ```
  Execution evidence: `playwright-report/`, `allure-results/`, `execution-evidence/EXECUTION-SUMMARY.md`, `executionResultLogs.log`, `API/testdata/api_requests.log`.
- **Validation Notes:** Coverage matrix documented in `prism_playwright/ASSESSMENT-COVERAGE.md`. Prompt history saved iteratively into `ai-prompts/` per phase.

---

## Entry 6 — Environment and SUT context for automation (Phase 1 → 2 handoff)

- **Prompt:** What environment variables and Prism config are needed to run Toolshop UI and API tests? Document assumptions for reviewers.
- **AI Response (short summary):** Required `.env` values:
  ```env
  TOOLSHOP_BASE_URL=https://practicesoftwaretesting.com
  TOOLSHOP_API_URL=https://api.practicesoftwaretesting.com
  URL=https://api.practicesoftwaretesting.com
  ```
  Optional: `PLAYWRIGHT_CHANNEL=chrome` on macOS. Setup steps: `npm install` → `npx playwright install chromium` → `cp .env.example .env` → `PLAYWRIGHT_CHANNEL=chrome npm test`.
- **Validation Notes:** Instructions added to `readme.md`. Verified full suite: **9 passed / 0 failed** (see `execution-evidence/EXECUTION-SUMMARY.md`).
