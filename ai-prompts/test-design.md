# AI Prompts – Test Design

## Entry 1 — UI AC1 scenarios

- **Prompt:** Design UI test scenarios for AC1: User Registration & Login covering register, login, and profile verification.
- **AI Response Summary:** Single E2E UI test covering registration with dynamic email, login with registered credentials, and profile field validation (first name, last name, email).
- **Validation Notes:** Tagged `@sanity` and `@regression`. Mapped to `TC-UI-001` through `TC-UI-003` in CSV.

## Entry 2 — UI AC2 scenarios

- **Prompt:** Design UI test scenarios for AC2: End-to-End Purchase Flow including multiple products, quantity update, COD checkout, double confirm, and My Invoices.
- **AI Response Summary:** E2E flow with pre-test login setup, add 2 products, update quantities in cart, COD payment, confirm twice, verify invoice list and details.
- **Validation Notes:** Mapped to `TC-UI-006` through `TC-UI-010`. Negative checkout and cart edge cases kept manual-only.

## Entry 3 — API AC1 & AC2 scenarios

- **Prompt:** Design API tests for register/login/token/cart and product/invoice lifecycle per assessment doc.
- **AI Response Summary:** API AC1 validates POST register, POST login, bearer token, POST cart. API AC2 validates GET products, POST add-to-cart, GET cart verification, POST invoice with COD payload.
- **Validation Notes:** Invoice payload aligned with assessment example (`billing_country: TG`, `payment_method: cash-on-delivery`).

## Entry 4 — Sanity vs Regression categorization

- **Prompt:** Categorize tests as sanity or regression per assessment guidance.
- **AI Response Summary:** Sanity = AC1 flows (UI + API). Regression = AC2 flows plus negative/edge manual cases in CSV.
- **Validation Notes:** Reflected in `FunctionalTestCase.csv` and npm scripts `test:smoke` / `test:regression`.
