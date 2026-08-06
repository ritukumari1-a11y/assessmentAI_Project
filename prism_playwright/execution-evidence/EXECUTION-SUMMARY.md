# Execution Summary — Full Regression Suite

**Date:** 2026-08-06  
**Command:** `PLAYWRIGHT_CHANNEL=chrome npm test`  
**Project:** `testcases_regression`  
**Result:** **9 passed / 0 failed** (1.8m)

## Environment

| Setting | Value |
|---------|-------|
| OS | macOS (darwin) |
| Browser | Chromium via `PLAYWRIGHT_CHANNEL=chrome` |
| Workers | 1 |
| Retries | 0 |
| UI base URL | `https://practicesoftwaretesting.com` |
| API base URL | `https://api.practicesoftwaretesting.com` |

## Test Results

| # | Spec | Test | Status | Duration |
|---|------|------|--------|----------|
| 1 | `API Test/productInvoiceGeneration.spec.js` | API AC2: Retrieve products, add to cart, verify cart and generate invoice | PASS | 2.8s |
| 2 | `API Test/productInvoiceGeneration.spec.js` | API AC2 negative: Generate invoice with invalid cart id returns 4xx | PASS | 0.7s |
| 3 | `API Test/productSearch.spec.js` | TC-API-010: GET /products?search returns filtered list | PASS | 0.8s |
| 4 | `API Test/userAuthCartCreation.spec.js` | API AC1: Register, login, obtain bearer token and create cart | PASS | 2.6s |
| 5 | `API Test/userAuthCartCreation.spec.js` | API AC1 negative: Login with invalid credentials returns 4xx | PASS | 0.7s |
| 6 | `UI Test/endToEndPurchaseFlow.spec.js` | AC2: Browse products, update cart, COD checkout and view invoice | PASS | 50.0s |
| 7 | `UI Test/productSearch.spec.js` | TC-UI-013: Search products by keyword shows matching results | PASS | 14.3s |
| 8 | `UI Test/userRegistrationLogin.spec.js` | AC1: Register with valid details, login and verify profile | PASS | 16.6s |
| 9 | `UI Test/userRegistrationLogin.spec.js` | AC1 negative: Login with incorrect password shows error | PASS | 5.9s |

## Artifacts (local, gitignored)

| Artifact | Path | Notes |
|----------|------|-------|
| Playwright HTML report | `playwright-report/` | `npx playwright show-report` |
| Allure raw results | `allure-results/` | `npm run test:allure` for HTML |
| Execution log | `executionResultLogs.log` | Winston logger output |
| API curl log | `API/testdata/api_requests.log` | Request-to-curl trace |
| Screenshots / video / trace | `test-results/` | Retained on failure only |

## Notes

- AC2 UI checkout uses **double Confirm** click (`toolshopCheckoutPage.confirmOrderTwice()`).
- AC1 negative UI test registers the user via **API** (setup only), then asserts UI login failure — keeps the test focused on login error handling.
- On macOS, set `PLAYWRIGHT_CHANNEL=chrome` and install `ffmpeg` for video capture.

## Reproduce

```bash
cd prism_playwright
npm install
cp .env.example .env
PLAYWRIGHT_CHANNEL=chrome npm test
```
