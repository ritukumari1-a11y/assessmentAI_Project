# Test Data Strategy — Toolshop Assessment

## Principles

1. **Unique emails per run** — avoid registration collisions (`workers: 1` + dynamic data).
2. **Static JSON for repeatable fields** — registration address, billing, invoice billing per assessment example.
3. **API/UI alignment** — UI billing uses US postal `33101`; API invoice uses assessment payload (`TG` / `1234AA`).
4. **No secrets in repo** — credentials only in local `.env` (gitignored).

## UI test data

| File | Purpose |
|------|---------|
| `UI/resources/data/toolshop/registrationData.json` | Valid user profile and address (`countryCode: US`, `house_number`) |
| `UI/resources/data/toolshop/billingData.json` | Checkout billing (`countryCode: US`, `postal_code: 33101`, COD) |
| `commonUtils/utils.js` | `generateRandomData("email")` → `@mailinator.com` per run |

## API test data

| File | Purpose |
|------|---------|
| `API/testdata/toolshop/invoicePayload.json` | Invoice POST body template (assessment example fields) |
| `API/utilities/toolshopDynamicData.js` | Runtime: `accessToken`, `cartId`, `productId`, `invoiceId` |
| `API/testdata/api_requests.log` | Generated CURL evidence after API test runs |

## Dynamic vs static

| Data | Strategy |
|------|----------|
| Email | Dynamic (Faker/utils) |
| Password | Static strong password in JSON |
| Product selection | Dynamic — first in-stock products from GET `/products` |
| Cart ID | From POST `/carts` response |
| Invoice payload | Static template + dynamic `cart_id` |

## AI-assisted generation

Documented in `../ai-prompts/test-data.md` — prompts used to derive registration/billing JSON and invoice payload alignment with the assessment doc.
