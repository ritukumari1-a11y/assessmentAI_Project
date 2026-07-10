# AI Prompts – Automation and Debugging

## Entry 1 — Framework structure

- **Prompt:** Create automation following existing Prism Playwright folder structure with page objects and apiHelper.
- **AI Response Summary:** Created `UI/pageobjects/toolshop/` with page classes and integrated Toolshop getters into central `POManager`. Created `API/pageobjects/toolshop/` for endpoints and payloads. Reused `commonMethods` from `apiHelper.js`.
- **Debugging Outcome:** Initial test list failed due to wrong relative path in `toolshopAuthPage.js`; fixed `../../../UI/resources/...` import path.

## Entry 2 — Missing dependencies

- **Prompt:** Run Playwright test listing after setup.
- **AI Response Summary:** Identified missing packages not in original `package.json`: `pdf-lib`, `sharp`, `sharp-pdf`, `csv-parse` from legacy framework utilities.
- **Debugging Outcome:** Installed missing packages; assessment tests no longer blocked by legacy import chain when listing UI tests.

## Entry 3 — Legacy test removal and Prism alignment

- **Prompt:** Remove default created scripts and replace with AC1/AC2 assessment automation only.
- **AI Response Summary:** Deleted legacy sample specs. Restored Prism-standard folders `tests/UI Test/` and `tests/API Test/` with descriptive spec names. Configured `testcases_regression` Playwright project.
- **Debugging Outcome:** `npx playwright test --list` shows 4 spec files / 7 tests (positive + negative API/UI cases).

## Entry 4 — Selector strategy

- **Prompt:** Use maintainable locators for PracticeSoftwareTesting UI.
- **AI Response Summary:** Primary selectors use `data-test` attributes with fallback locators for profile, cart, checkout, and invoices.
- **Debugging Outcome:** Locators may need minor tuning after first live run if SUT DOM differs; trace/video configured `retain-on-failure` for debugging.
