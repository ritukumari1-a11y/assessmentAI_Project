# QA Practical Assessment — Prism Playwright (Toolshop)

Playwright UI + API automation for the **QA AI Capability Exercise**, using the Prism Page Object Model framework.

## Application Under Test

| Layer | URL |
|-------|-----|
| UI | https://practicesoftwaretesting.com |
| API | https://api.practicesoftwaretesting.com |

## Assessment documentation (this folder)

| Document | Purpose |
|----------|---------|
| [ASSESSMENT-COVERAGE.md](./ASSESSMENT-COVERAGE.md) | Maps every doc requirement → artifact |
| [FOLDER-STRUCTURE.md](./FOLDER-STRUCTURE.md) | Required folder layout |
| [TEST-DATA-STRATEGY.md](./TEST-DATA-STRATEGY.md) | Static/dynamic test data |
| [execution-evidence/EXECUTION-SUMMARY.md](./execution-evidence/EXECUTION-SUMMARY.md) | Latest test run results |

Parent repo: `../readme.md`, `../project-info.md`, `../FunctionalTestCase.csv`, `../ai-prompts/`

## Prerequisites

```bash
cd prism_playwright
npm install
npx playwright install chromium
npx playwright install ffmpeg   # required for video on macOS
```

On macOS, if Chromium crashes, use system Chrome:

```bash
export PLAYWRIGHT_CHANNEL=chrome
```

## Environment setup

```bash
cp .env.example .env
```

Required in `.env`:

```env
TOOLSHOP_BASE_URL=https://practicesoftwaretesting.com
TOOLSHOP_API_URL=https://api.practicesoftwaretesting.com
PLAYWRIGHT_CHANNEL=chrome   # optional, recommended on Mac
```

## Folder structure (summary)

```
tests/
├── UI Test/          # AC1, AC2 E2E, product search
└── API Test/         # API AC1, AC2, product search
UI/pageobjects/toolshop/   # UI page objects
API/pageobjects/toolshop/  # API endpoints & payloads
UI/resources/data/toolshop/  # registrationData.json, billingData.json
API/testdata/toolshop/       # invoicePayload.json
```

See [FOLDER-STRUCTURE.md](./FOLDER-STRUCTURE.md) for the full tree.

## Automated tests (9 total)

### UI tests (`tests/UI Test/`)

| Spec | Tests | Tags | AC / CSV |
|------|-------|------|----------|
| `userRegistrationLogin.spec.js` | Register, login, profile; wrong password | @sanity @regression | AC1, TC-UI-001–005 |
| `endToEndPurchaseFlow.spec.js` | Cart, checkout COD, invoice (confirm twice) | @regression | AC2, TC-UI-006–010 |
| `productSearch.spec.js` | Search products by keyword | @regression | TC-UI-013 |

### API tests (`tests/API Test/`)

| Spec | Tests | Tags | AC / CSV |
|------|-------|------|----------|
| `userAuthCartCreation.spec.js` | Register, login, cart; invalid login | @sanity @regression | API AC1, TC-API-001–004 |
| `productInvoiceGeneration.spec.js` | Products, cart, invoice; invalid cart | @regression | API AC2, TC-API-005–009 |
| `productSearch.spec.js` | GET /products?search= | @regression | TC-API-010 |

## How to run

| Command | Description |
|---------|-------------|
| `PLAYWRIGHT_CHANNEL=chrome npm test` | Run all 9 tests |
| `npm run test:smoke` | @sanity — UI AC1 + API AC1 |
| `npm run test:regression` | @regression — full suite |
| `npm run test:ui` | All UI tests |
| `npm run test:api` | All API tests |
| `npm run test:ui:ac1` | UI AC1 only |
| `npm run test:ui:ac2` | UI AC2 E2E only |
| `npm run test:ui:search` | UI product search |
| `npm run test:api:ac1` | API AC1 only |
| `npm run test:api:ac2` | API AC2 only |
| `npm run test:api:search` | API product search |
| `npm run report` | Open Playwright HTML report |
| `npm run test:allure` | Run tests + generate Allure report |

## Reports and execution evidence

| Artifact | Location |
|----------|----------|
| Playwright HTML | `playwright-report/` |
| Allure raw | `allure-results/` |
| Allure HTML | `allure-report/` (after `npm run allure:generate`) |
| Screenshots / video / trace | `test-results/` |
| API CURL logs | `API/testdata/api_requests.log` |
| Execution log | `executionResultLogs.log` |
| Pass/fail summary | `execution-evidence/EXECUTION-SUMMARY.md` |

## Important notes

- **Invoice UI:** Press **Confirm** twice on checkout to generate the invoice (application requirement).
- **Tags:** `@sanity` = smoke; `@regression` = full regression including negatives and AC2.
- **Manual-only cases** (validation, NFR, edge) remain in `../FunctionalTestCase.csv`.
