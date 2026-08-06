const { expect } = require("@playwright/test");
const { default: loggerUtilities } = require("../../../commonUtils/loggerUtil");

class toolshopCheckoutPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.billingStreet = page.locator('[data-test="street"]');
    this.billingCity = page.locator('[data-test="city"]');
    this.billingState = page.locator('[data-test="state"]');
    this.billingCountry = page.locator('[data-test="country"]');
    this.billingPostalCode = page.locator('[data-test="postal_code"]');
    this.billingHouseNumber = page.locator('[data-test="house_number"]');
    this.paymentMethod = page.locator('[data-test="payment-method"]');
    this.confirmButton = page.locator('[data-test="finish"], [data-test="confirm"]');
    this.orderSuccess = page
      .locator('[data-test="order-success"]')
      .or(page.getByText(/thanks for your order|invoice number is/i));
    this.proceedButton = page.locator(
      '[data-test="proceed-1"], [data-test="proceed-checkout"], button:has-text("Proceed to checkout")'
    );
  }

  async proceedToBillingStep() {
    const signInProceed = this.page.getByRole("button", { name: /proceed to checkout/i });
    if (await signInProceed.isVisible().catch(() => false)) {
      await signInProceed.click();
    } else if (await this.proceedButton.first().isVisible().catch(() => false)) {
      await this.proceedButton.first().click();
    }
    await this.page.locator('[data-test="street"]').waitFor({ state: "visible", timeout: 30000 });
    this.log.logger("Reached billing address step");
  }

  async fillBillingDetails(billing) {
    await this.proceedToBillingStep();
    await this.billingStreet.fill(billing.street);
    await this.billingCity.fill(billing.city);
    await this.billingState.fill(billing.state);
    await this.billingCountry.selectOption({ value: billing.countryCode || billing.country });
    await this.billingPostalCode.fill(billing.postal_code);
    if (billing.house_number && (await this.billingHouseNumber.count())) {
      await this.billingHouseNumber.fill(billing.house_number);
    }
    const billingProceed = this.page.getByRole("button", { name: /proceed to checkout/i });
    if (await billingProceed.isVisible().catch(() => false)) {
      await billingProceed.click();
    }
    this.log.logger("Filled billing details");
  }

  async proceedToPaymentStep() {
    await this.paymentMethod.waitFor({ state: "visible", timeout: 30000 });
    this.log.logger("Reached payment step");
  }

  async selectCashOnDelivery() {
    await this.proceedToPaymentStep();
    await this.paymentMethod.selectOption("cash-on-delivery");
    this.log.logger("Selected Cash on Delivery payment method");
  }

  async confirmOrderTwice() {
    const confirmBtn = this.page
      .locator('[data-test="confirm"], [data-test="finish"]')
      .filter({ visible: true });
    await expect(confirmBtn.first()).toBeVisible({ timeout: 15000 });

    const invoiceResponsePromise = this.page.waitForResponse(
      (resp) =>
        resp.url().includes("invoices") &&
        resp.request().method() === "POST" &&
        resp.status() >= 200 &&
        resp.status() < 300,
      { timeout: 60000 }
    );

    await confirmBtn.first().click();
    await this.page.waitForTimeout(1000);
    await confirmBtn.first().click();

    const invoiceResponse = await invoiceResponsePromise;
    expect(invoiceResponse.ok()).toBeTruthy();
    this.log.logger("Clicked confirm button twice to generate invoice");
  }

  async verifyOrderSuccess() {
    await expect(this.orderSuccess).toBeVisible({ timeout: 30000 });
    this.log.logger("Order success message verified");
  }
}

module.exports = { toolshopCheckoutPage };
