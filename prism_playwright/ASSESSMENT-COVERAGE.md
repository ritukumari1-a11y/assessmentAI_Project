# QA Practical Assessment — Coverage Matrix

This document maps **every submission requirement** from `QA Practical Assessment (1).docx` to artifacts inside `prism_playwright/` and the parent repository.

## Part B — System Under Test

| Requirement | Coverage | Location |
|-------------|----------|----------|
| UI SUT: practicesoftwaretesting.com | Configured | `.env.example` → `TOOLSHOP_BASE_URL` |
| API SUT: api.practicesoftwaretesting.com | Configured | `.env.example` → `TOOLSHOP_API_URL` |
| Press confirm **twice** for invoice | Automated + documented | `UI/pageobjects/toolshop/toolshopCheckoutPage.js` → `confirmOrderTwice()`; `tests/UI Test/endToEndPurchaseFlow.spec.js` |
| AC1 UI: Register → Login → Profile | Automated | `tests/UI Test/userRegistrationLogin.spec.js` |
| AC2 UI: Browse → Cart → Checkout COD → Invoice | Automated | `tests/UI Test/endToEndPurchaseFlow.spec.js` |
| API AC1: Register → Login → Token → Cart | Automated | `tests/API Test/userAuthCartCreation.spec.js` |
| API AC2: Products → Cart → Invoice | Automated | `tests/API Test/productInvoiceGeneration.spec.js` |
| Invoice POST body (billing + COD) | API payload | `API/testdata/toolshop/invoicePayload.json` |
| Sanity vs Regression categorization | Tags `@sanity` / `@regression` | All spec files; `npm run test:smoke` / `test:regression` |

## Common QA Requirements (Submission Checklist)

| # | Requirement | Status | Location |
|---|-------------|--------|----------|
| 1 | Requirement and risk analysis | Done (repo root) | `../project-info.md` |
| 2 | project-info document | Done (repo root) | `../project-info.md` |
| 3 | Manual test suite | Done (repo root) | `../FunctionalTestCase.csv` (27 cases) |
| 4 | UI automation tier (smoke + E2E/regression) | Done | `tests/UI Test/` (4 spec files) |
| 5 | API automation tier | Done | `tests/API Test/` (3 spec files) |
| 6 | Test data strategy | Done | `TEST-DATA-STRATEGY.md`, `UI/resources/data/toolshop/`, `API/testdata/toolshop/` |
| 7 | Execution evidence (logs, reports) | Done | `execution-evidence/`, `executionResultLogs.log`, `playwright-report/`, `allure-results/` |
| 8 | README — setup and run instructions | Done | `README.md` (this folder) + `../readme.md` |
| 9 | Full prompt history | Done (repo root) | `../ai-prompts/` (5 files) |
| 10 | Clear folder structure | Done | `FOLDER-STRUCTURE.md` |

## Core Acceptance Criteria (QA Perspective)

| # | Criterion | How we cover it |
|---|-----------|-----------------|
| 1 | Clear test objectives and scope | AC1/AC2 specs + `FunctionalTestCase.csv` |
| 2 | Traceable requirements → tests | CSV `Automation Mapping` column + `testCasesMeta.json` + test annotations |
| 3 | Valid and invalid transitions | Negative UI login, negative API auth/invoice tests |
| 4 | UI: create, list, view, update, search, error handling | Register (create), products list, profile view, cart update, product search, login error |
| 5 | API: create, list, view, update, search, error handling | Register, GET products/cart, invoice create, cart add, product search API, 4xx negatives |
| 6 | Well-planned test data | Dynamic emails, static JSON, invoice payload per assessment example |
| 7 | Runnable from README without manual steps | `npm install` → `cp .env.example .env` → `PLAYWRIGHT_CHANNEL=chrome npm test` |
| 8 | Thoughtful AI use | `../ai-prompts/` with prompt → summary → validation format |

## Automated Test Inventory (9 tests — within 5–8 per tier guideline)

### UI (`tests/UI Test/`)

| Test | Tags | CSV IDs | Spec file |
|------|------|---------|-----------|
| AC1: Register, login, verify profile | @sanity @regression | TC-UI-001–003 | `userRegistrationLogin.spec.js` |
| AC1 negative: Wrong password | @regression | TC-UI-005 | `userRegistrationLogin.spec.js` |
| AC2: E2E purchase + invoice | @regression | TC-UI-006–010 | `endToEndPurchaseFlow.spec.js` |
| Product search by keyword | @regression | TC-UI-013 | `productSearch.spec.js` |

### API (`tests/API Test/`)

| Test | Tags | CSV IDs | Spec file |
|------|------|---------|-----------|
| API AC1: Auth + cart | @sanity @regression | TC-API-001–003 | `userAuthCartCreation.spec.js` |
| API AC1 negative: Invalid login | @regression | TC-API-004 | `userAuthCartCreation.spec.js` |
| API AC2: Products, cart, invoice | @regression | TC-API-005–008 | `productInvoiceGeneration.spec.js` |
| API AC2 negative: Invalid cart invoice | @regression | TC-API-009 | `productInvoiceGeneration.spec.js` |
| API product search | @regression | TC-API-010 | `productSearch.spec.js` |

### Manual-only (documented in CSV)

TC-UI-004, TC-UI-011, TC-UI-012, TC-NFR-001–003 — covered in `FunctionalTestCase.csv`, not automated (per scope).

## Tool-Specific Expectations

| Expectation | Status |
|-------------|--------|
| Playwright (Prism Framework) | `playwright.config.js`, POM under `UI/pageobjects/`, `API/pageobjects/` |
| Cursor AI | Documented in `../project-info.md` |
| Execution reports — all Passed | See `execution-evidence/EXECUTION-SUMMARY.md` |
| Iterative git commits | Repo history (outside this folder) |
| Public git URL | Submission step |
