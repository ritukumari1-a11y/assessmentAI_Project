# AI Prompts – Documentation and Summary

Prompts used for README, project-info, coverage docs, folder structure, execution evidence, and final submission polish. Format per assessment doc: **Prompt → AI Response Summary → Edits You Made → Reason for Edits**.

---

## Entry 1 — project-info.md per Part A template (Phase 1)

- **Prompt:** Create `project-info.md` per QA Practical Assessment submission template. Include primary AI tool, SUT URLs, assessment dates, project summary, tools used, and all 10 Setup Summary questions (context, requirement analysis, test planning, manual design, automation design, validation, test data, debugging, info not shared, reuse in real projects).
- **AI Response Summary:** Generated `project-info.md` at repo root with:
  - Cursor AI as primary tool
  - AC1/AC2 UI and API coverage with spec file paths and tags
  - Setup Summary answering all 10 workflow questions
  - Requirement and risk analysis table (duplicate email, double confirm, token expiry, flaky selectors, etc.)
- **Edits You Made:** Added concrete spec paths (`prism_playwright/tests/UI Test/...`) instead of generic descriptions. Set Submission Date to August 6, 2026 after final test run.
- **Reason for Edits:** Reviewers need one-click navigation to automation files. Dates reflect actual completion, not placeholder same-day start/submit.

---

## Entry 2 — readme.md setup and execution guide (Phase 4)

- **Prompt:** Create `readme.md` with Project Information section: framework used, prerequisites, env setup, test data locations, smoke/regression run commands, AC mapping, report output paths, and AI Prompts folder expectations.
- **AI Response Summary:** `readme.md` includes:
  - SUT URLs table (UI + API)
  - `npm install` → `cp .env.example .env` → `npx playwright install chromium`
  - Command table: `npm test`, `npm run test:smoke`, `npm run test:regression`, per-AC scripts, Allure commands
  - Test data path table pointing to JSON files and `FunctionalTestCase.csv`
  - Assessment docs index (`ASSESSMENT-COVERAGE.md`, `FOLDER-STRUCTURE.md`, `TEST-DATA-STRATEGY.md`)
- **Edits You Made:** Added `PLAYWRIGHT_CHANNEL=chrome` note for macOS. Documented double-confirm invoice rule in Notes section. Linked `ai-prompts/` entry format per file.
- **Reason for Edits:** Assessment requires runnable suite from README with minimal manual steps. Double confirm is easy to miss and causes AC2 failure.

---

## Entry 3 — FunctionalTestCase.csv manual suite (Phase 2)

- **Prompt:** Create `FunctionalTestCase.csv` at repo root with UI, API, and NFR cases. Columns: Test ID, AC Reference, Module, Test Type, Category, Priority, Scenario, Preconditions, Steps, Expected Result, Automation Mapping, Sanity/Regression.
- **AI Response Summary:** **27 cases** covering:
  - UI AC1/AC2 positive, negative, edge (TC-UI-001–013)
  - API AC1/AC2 positive and negative (TC-API-001–010)
  - NFR manual (TC-NFR-001–003)
  Each row maps to spec file or `Manual only`.
- **Edits You Made:** Split AC1 into three CSV rows (register, login, profile) while keeping one automated E2E test. Added TC-UI-013 and TC-API-010 for product search after automation was added.
- **Reason for Edits:** Manual suite shows granular traceability; automation stays one flow per AC for maintainability. Search cases added when specs were created.

---

## Entry 4 — npm scripts and Playwright project config (Phase 3)

- **Prompt:** Add npm scripts for smoke, regression, per-AC runs, and Allure reporting. Use Prism-standard Playwright project name `testcases_regression`.
- **AI Response Summary:** `prism_playwright/package.json` scripts:
  | Script | Command |
  |--------|---------|
  | `test` | Full suite, project `testcases_regression` |
  | `test:smoke` | `--grep @sanity` |
  | `test:regression` | `--grep @regression` |
  | `test:ui:ac1` / `test:ui:ac2` / `test:api:ac1` / etc. | Per-spec runs |
  | `test:allure` | Run tests + generate Allure HTML |
- **Edits You Made:** Kept `testcases_regression` as project name (Prism convention). Added `test:ui:search` and `test:api:search` when product search specs were added.
- **Reason for Edits:** Reviewers run smoke first to validate connectivity; regression for full scope. Per-AC scripts help debug single flow failures.

---

## Entry 5 — Assessment coverage and folder structure docs (Phase 4)

- **Prompt:** Create internal assessment docs mapping every submission requirement from QA Practical Assessment docx to repo artifacts. Document folder structure for reviewers.
- **AI Response Summary:** Created inside `prism_playwright/`:
  - `ASSESSMENT-COVERAGE.md` — Part B checklist, Core AC criteria, automated test inventory (9 tests)
  - `FOLDER-STRUCTURE.md` — Tree view of tests, page objects, test data, reports
  - `TEST-DATA-STRATEGY.md` — Static vs dynamic data principles
- **Edits You Made:** Updated inventory from 7 tests to 9 tests when product search specs were added. Linked parent-repo files (`../FunctionalTestCase.csv`, `../ai-prompts/`).
- **Reason for Edits:** Single traceability doc saves reviewer time. Counts must match actual `npx playwright test --list` output.

---

## Entry 6 — Execution evidence documentation (Phase 4)

- **Prompt:** Document test execution results for submission. All automated tests must show Passed status. Where are reports, logs, and traces?
- **AI Response Summary:** Created `prism_playwright/execution-evidence/EXECUTION-SUMMARY.md`:
  - Command: `PLAYWRIGHT_CHANNEL=chrome npm test`
  - Result: **9 passed / 0 failed** (~1.8m)
  - Per-test table with spec, duration, PASS status
  - Artifact paths: `playwright-report/`, `allure-results/`, `executionResultLogs.log`, `api_requests.log`, `test-results/`
- **Edits You Made:** Added reproduce steps and notes on AC1 negative API setup, double confirm, macOS Chrome channel.
- **Reason for Edits:** Assessment explicitly requires execution reports with Passed status. Reproduce block lets reviewers verify independently.

---

## Entry 7 — ai-prompts folder and readme cross-reference (Phase 4)

- **Prompt:** Align `readme.md` AI Prompts section with assessment doc folder structure. Document expected entry format for each ai-prompts file.
- **AI Response Summary:** `readme.md` lists:
  ```
  ai-prompts/
  ├── requirements-and-planning.md
  ├── test-design.md
  ├── test-data.md
  ├── automation-and-debugging.md
  └── documentation-and-summary.md
  ```
  Per-file format: Prompt → Summary → Validation Notes (or Debugging Outcome / Edits + Reason).
- **Edits You Made:** Refreshed all five ai-prompts files with phase-wise entries tied to real framework paths. Removed stale references to old folder names (`Assement/`, 7 tests, `Welcome@1` password).
- **Reason for Edits:** Evaluators score thoughtful AI use from prompt history — entries must match actual code and match assessment template headings.

---

## Entry 8 — Submission deliverables summary (Phase 5)

- **Prompt:** Summarize all QA assessment deliverables for final submission checklist. Confirm Part A and Part B completeness.
- **AI Response Summary:** **Part A (30%):** `project-info.md` + `ai-prompts/` prompt history  
  **Part B (70%):**
  | Deliverable | Location | Status |
  |-------------|----------|--------|
  | Manual test suite | `FunctionalTestCase.csv` | 27 cases |
  | UI automation | `prism_playwright/tests/UI Test/` | 4 tests / 3 specs |
  | API automation | `prism_playwright/tests/API Test/` | 5 tests / 3 specs |
  | Test data strategy | `TEST-DATA-STRATEGY.md` + JSON files | Done |
  | Execution evidence | `execution-evidence/`, reports, logs | 9 Passed |
  | README | `readme.md` | Runnable from npm |
  | Playwright + Cursor | `playwright.config.js`, documented in project-info | Done |
- **Edits You Made:** Added `ASSESSMENT-COVERAGE.md` as reviewer quick-check. Noted remaining submission step: iterative git push to public repo URL (`assessmentAI_Project` on GitHub).
- **Reason for Edits:** Assessment requires public git with iterative commits — documented as final step without bundling everything in one commit.

---

## Entry 9 — Double-confirm and edge-case documentation (Phase 3–4)

- **Prompt:** Assessment doc stresses pressing confirm twice for invoice. Ensure this is documented everywhere a reviewer might look — not only in code.
- **AI Response Summary:** Documented in:
  - `readme.md` Notes section
  - `endToEndPurchaseFlow.spec.js` file comment
  - `toolshopCheckoutPage.confirmOrderTwice()` implementation
  - `ai-prompts/automation-and-debugging.md` Entry 4
  - `execution-evidence/EXECUTION-SUMMARY.md` Notes
- **Edits You Made:** Used consistent wording: "press confirm button twice to generate invoice" across docs.
- **Reason for Edits:** Single most common AC2 failure without this knowledge. Assessment Quick Tips explicitly warn about this behavior.

---

## Entry 10 — Final review against participant guide (Phase 5)

- **Prompt:** `@QA Practical Assessment (1).docx AS QA` — final review of submission readiness. What is complete and what remains?
- **AI Response Summary:**
  - **Complete:** All required files, 9 automated tests Passed, traceability AC → CSV → specs, ai-prompts with iterative entries, risk analysis, smoke/regression tags
  - **Remaining:** Push iterative commits to public GitHub; optional `.cursor/rules` folder
  - **Verified:** `PLAYWRIGHT_CHANNEL=chrome npm test` → 9 passed / 0 failed
- **Edits You Made:** Updated `project-info.md` submission date and refreshed all `ai-prompts/` files to assessment template depth.
- **Reason for Edits:** Submission quality depends on artifact completeness and accurate prompt history — not just passing tests.
