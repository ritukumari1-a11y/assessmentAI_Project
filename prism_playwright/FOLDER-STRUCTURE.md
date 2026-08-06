# Prism Playwright — Folder Structure (Assessment Alignment)

Aligned with the **QA Practical Assessment** required repository layout and Prism framework conventions.

```
prism_playwright/                          # PrismStructure — Playwright UI + API + execution reports
├── README.md                              # Setup, run commands, AC mapping, report locations
├── ASSESSMENT-COVERAGE.md                 # Doc requirement → artifact traceability matrix
├── FOLDER-STRUCTURE.md                    # This file
├── TEST-DATA-STRATEGY.md                  # Static/dynamic data and API payloads
├── playwright.config.js                   # Project, reporters, browser, timeouts
├── package.json                           # npm scripts: smoke, regression, allure
├── .env.example                           # Toolshop URLs + optional PLAYWRIGHT_CHANNEL
├── .gitignore                             # Generated reports and local secrets
│
├── execution-evidence/                    # Submission execution proof
│   └── EXECUTION-SUMMARY.md               # Latest pass/fail summary
│
├── tests/
│   ├── UI Test/                           # UI automation (@sanity / @regression)
│   │   ├── userRegistrationLogin.spec.js  # AC1 UI + negative login
│   │   ├── endToEndPurchaseFlow.spec.js   # AC2 UI E2E + invoice
│   │   └── productSearch.spec.js          # Product search (TC-UI-013)
│   └── API Test/                          # API automation
│       ├── userAuthCartCreation.spec.js   # API AC1 + negative
│       ├── productInvoiceGeneration.spec.js # API AC2 + negative
│       └── productSearch.spec.js          # Product search API (TC-API-010)
│
├── UI/
│   ├── pageobjects/
│   │   ├── POManager.js                   # Central PO manager (Toolshop getters)
│   │   └── toolshop/                      # Toolshop page objects
│   │       ├── toolshopPOManager.js
│   │       ├── toolshopRegistrationPage.js
│   │       ├── toolshopLoginPage.js
│   │       ├── toolshopProductPage.js
│   │       ├── toolshopCartPage.js
│   │       ├── toolshopCheckoutPage.js
│   │       └── toolshopInvoicePage.js
│   └── resources/data/
│       ├── testCasesMeta.json             # Test key → Xray/annotation IDs
│       └── toolshop/
│           ├── registrationData.json
│           └── billingData.json
│
├── API/
│   ├── pageobjects/toolshop/              # Endpoints, headers, payload builders
│   │   ├── toolshopAuthPage.js
│   │   ├── toolshopCartPage.js
│   │   ├── toolshopProductPage.js
│   │   └── toolshopInvoicePage.js
│   ├── testdata/
│   │   ├── api_requests.log               # CURL logs (generated on API runs)
│   │   ├── commonAPIResponse              # Status code constants
│   │   └── toolshop/invoicePayload.json
│   └── utilities/
│       ├── apiHelper.js                   # GET/POST helpers
│       ├── toolshopDynamicData.js         # Token, cartId, productId state
│       └── requestToCurlLogger.js
│
├── commonUtils/
│   ├── utils.js                           # Faker emails, test annotations
│   └── loggerUtil.js
│
├── playwright-report/                     # HTML report (generated)
├── allure-results/                        # Allure raw (generated)
├── allure-report/                         # Allure HTML (npm run allure:generate)
├── test-results/                          # Screenshots, video, trace (generated)
└── executionResultLogs.log                # Winston execution log (generated)
```

## Parent repository (required alongside prism_playwright)

```
qa-ai-practical-assessment/
├── FunctionalTestCase.csv
├── project-info.md
├── readme.md
├── ai-prompts/
│   ├── requirements-and-planning.md
│   ├── test-design.md
│   ├── test-data.md
│   ├── automation-and-debugging.md
│   └── documentation-and-summary.md
└── prism_playwright/                      # ← this folder
```
