# AI Prompts – Requirements and Planning

## Entry 1

- **Prompt:** Analyse the `prism_playwright/` folder and confirm whether Playwright is installed and ready for test execution.
- **AI Response (short summary):** Inspected `package.json`, `playwright.config.js`, and `node_modules`. Found Playwright declared but not installed; missing `.env`. Recommended `npm install`, browser install, and env setup.
- **Validation Notes:** Verified by running `npx playwright test --list` before and after install.

## Entry 2

- **Prompt:** Proceed with Playwright installation and environment setup for the assessment project.
- **AI Response (short summary):** Ran `npm install`, installed Chromium, added `.env.example`, and fixed missing dependencies (`pdf-lib`, `sharp`, `csv-parse`).
- **Validation Notes:** Test listing worked after dependency fixes.

## Entry 3

- **Prompt:** Analyse `QA Practical Assessment.docx` and create UI/API test case folders following Prism Playwright structure for PracticeSoftwareTesting Toolshop.
- **AI Response (short summary):** Extracted AC1/AC2 UI and API flows from docx. Created `tests/UI Test/` and `tests/API Test/` folders, toolshop page objects, test data, and Playwright project `testcases_regression`.
- **Validation Notes:** Mapped ACs to spec files and tags (`@sanity`, `@regression`).

## Entry 4

- **Prompt:** Create manual test CSV, project-info, readme, ai-prompts. Remove default legacy scripts and replace automation per AC1 and AC2 from assessment doc.
- **AI Response (short summary):** Removed legacy sample specs. Rewrote AC-based automation, created `FunctionalTestCase.csv`, `project-info.md`, `readme.md`, and ai-prompts documentation.
- **Validation Notes:** Confirmed only assessment tests remain under `tests/UI Test/` and `tests/API Test/`.
