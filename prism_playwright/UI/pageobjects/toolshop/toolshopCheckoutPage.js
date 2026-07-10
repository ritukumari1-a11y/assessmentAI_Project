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
    this.paymentMethod = page.locator('[data-test="payment-method"]');
    this.confirmButton = page.locator('[data-test="finish"], [data-test="confirm"]');
    this.orderSuccess = page.locator('[data-test="order-success"], .alert-success, [role="alert"]');
  }

  async fillBillingDetails(billing) {
    await this.billingStreet.fill(billing.street);
    await this.billingCity.fill(billing.city);
    await this.billingState.fill(billing.state);
    await this.billingCountry.selectOption({ label: billing.country });
    await this.billingPostalCode.fill(billing.postal_code);
    this.log.logger("Filled billing details");
  }

  async selectCashOnDelivery() {
    await this.paymentMethod.selectOption("cash-on-delivery");
    this.log.logger("Selected Cash on Delivery payment method");
  }

  async confirmOrderTwice() {
    await this.confirmButton.first().click();
    await this.page.waitForTimeout(1000);
    if (await this.confirmButton.count()) {
      await this.confirmButton.first().click();
    }
    this.log.logger("Clicked confirm button twice to generate invoice");
  }

  async verifyOrderSuccess() {
    await expect(this.orderSuccess.first()).toBeVisible({ timeout: 25000 });
    this.log.logger("Order success message verified");
  }
}

module.exports = { toolshopCheckoutPage };
