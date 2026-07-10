# AI Prompts – Test Data

## Entry 1 — Registration data

- **Prompt:** Create test data for Toolshop user registration used by UI and API tests.
- **AI Response Summary:** Added `registrationData.json` with valid user profile and address. Password `Welcome@1` reused across UI/API for consistency.
- **Validation Notes:** Dynamic email generated per run via `utils.generateRandomData("email")` and Faker in API auth page object to avoid duplicate registration failures.

## Entry 2 — Billing and invoice payload

- **Prompt:** Create billing test data for COD checkout and API invoice generation.
- **AI Response Summary:** Added `billingData.json` for UI checkout. API invoice payload uses assessment example fields with `billing_country: TG` and empty `payment_details: {}`.
- **Validation Notes:** Cross-checked against invoice POST example in QA Practical Assessment docx.

## Entry 3 — Test data strategy

- **Prompt:** How should test data be managed for repeatability and isolation?
- **AI Response Summary:** Static JSON for stable fields (address, payment method); dynamic email per test run; `toolshopDynamicData` singleton stores access token, cart ID, product ID, and invoice ID across API steps.
- **Validation Notes:** API AC2 uses `beforeAll` to prepare authenticated cart context shared within the spec file.
