# QA Practical Assessment — PracticeSoftwareTesting Toolshop

Playwright automation for the QA AI Capability Exercise using the **Prism Playwright framework**.

## Project Information

### Application Under Test

| Layer | URL |
|-------|-----|
| UI | https://practicesoftwaretesting.com |
| API | https://api.practicesoftwaretesting.com |

### Framework

- **Automation:** Playwright + Page Object Model (Prism structure)
- **AI Tool:** Cursor AI
- **Playwright project:** `testcases_regression`
- **Test folders:** `prism_playwright/tests/UI Test` and `prism_playwright/tests/API Test`

### Prerequisites

1. Node.js 18+ and npm
2. Dependencies installed in `prism_playwright/`

```bash
cd prism_playwright
npm install
npx playwright install chromium
```

### Environment Setup

Copy and update environment variables:

```bash
cd prism_playwright
cp .env.example .env
```

Required variables in `prism_playwright/.env`:

```env
TOOLSHOP_BASE_URL=https://practicesoftwaretesting.com
TOOLSHOP_API_URL=https://api.practicesoftwaretesting.com
URL=https://api.practicesoftwaretesting.com
```

### Test Data Location

| Data | Path |
|------|------|
| UI registration data | `prism_playwright/UI/resources/data/toolshop/registrationData.json` |
| UI billing data | `prism_playwright/UI/resources/data/toolshop/billingData.json` |
| Manual test cases | `FunctionalTestCase.csv` (27 cases at repo root) |
| Test case IDs (Xray) | `prism_playwright/UI/resources/data/testCasesMeta.json` |
| API invoice payload | `prism_playwright/API/testdata/toolshop/invoicePayload.json` |

### How to Run Tests

From `prism_playwright/` directory:

| Command | Description |
|---------|-------------|
| `npm test` | Run all 7 automated tests |
| `npm run test:smoke` | **Smoke / Sanity** — `@sanity` (AC1 UI + API AC1) |
| `npm run test:regression` | **Regression** — `@regression` (AC2, negatives, full suite) |
| `npm run test:ui` | All UI tests |
| `npm run test:api` | All API tests |
| `npm run test:ui:ac1` | UI AC1 only |
| `npm run test:ui:ac2` | UI AC2 only |
| `npm run test:api:ac1` | API AC1 only |
| `npm run test:api:ac2` | API AC2 only |
| `npm run report` | Open Playwright HTML report |
| `npm run allure:generate` | Generate Allure HTML report from results |
| `npm run allure:open` | Open generated Allure report |
| `npm run test:allure` | Run tests then generate Allure report |

#### Examples

```bash
# Smoke suite
npm run test:smoke

# Full regression
npm run test:regression

# Run tests and generate Allure report (requires Allure CLI: brew install allure)
npm run test:allure
npm run allure:open

# Headed UI AC2 only
npx playwright test "tests/UI Test/endToEndPurchaseFlow.spec.js" --headed
```

### Acceptance Criteria — Automation Mapping

#### UI AC1: User Registration & Login
Register → Login → Verify profile

```bash
npm run test:ui:ac1
```

**File:** `tests/UI Test/userRegistrationLogin.spec.js`

#### UI AC2: End-to-End Purchase Flow
Browse → Add multiple products → Update quantity → COD checkout → Confirm twice → View invoice

```bash
npm run test:ui:ac2
```

**File:** `tests/UI Test/endToEndPurchaseFlow.spec.js`

#### API AC1: User Authentication & Cart Creation

```bash
npm run test:api:ac1
```

**File:** `tests/API Test/userAuthCartCreation.spec.js`

#### API AC2: Product Selection & Invoice Generation

```bash
npm run test:api:ac2
```

**File:** `tests/API Test/productInvoiceGeneration.spec.js`

### Reports & Evidence (final output locations)

| Artifact | Location |
|----------|----------|
| Playwright HTML report | `prism_playwright/playwright-report/` |
| Allure results (raw) | `prism_playwright/allure-results/` |
| Allure HTML report | `prism_playwright/allure-report/` |
| Screenshots / video / trace | `prism_playwright/test-results/` |
| API curl logs | `prism_playwright/API/testdata/api_requests.log` |
| Execution logs | `prism_playwright/executionResultLogs.log` |
| Browser state | `prism_playwright/storeBrowserState.json` |

### Related Documentation

- `project-info.md` — AI workflow, risk analysis, and project summary
- `FunctionalTestCase.csv` — Manual functional test suite (27 cases)

---

## AI Prompts Folder and History

Full prompt history is stored in `ai-prompts/` at the repository root. Each file records iterative AI use for a phase of the testing lifecycle.

```
ai-prompts/
├── requirements-and-planning.md   # SUT context, AC extraction, test plan
├── test-design.md                 # UI/API scenario and case design
├── test-data.md                   # Registration, billing, dynamic data strategy
├── automation-and-debugging.md    # POM structure, dependencies, locator fixes
└── documentation-and-summary.md   # README, CSV, npm scripts, submission polish
```

**Entry format per file:**
- **requirements-and-planning.md:** Prompt → AI Response (short summary) → Validation Notes
- **test-design.md / test-data.md:** Prompt → AI Response Summary → Validation Notes
- **automation-and-debugging.md:** Prompt → AI Response Summary → Debugging Outcome
- **documentation-and-summary.md:** Prompt → AI Response Summary → Edits You Made → Reason for Edits

---

## Notes

- For invoice generation on UI, **press the confirm button twice** as required by the application.
- UI tests run headless Chromium by default (see `playwright.config.js`); use `--headed` for visible browser.
- Dynamic user emails are generated per run to avoid registration conflicts.
