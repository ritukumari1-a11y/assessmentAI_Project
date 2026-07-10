const { expect } = require("@playwright/test");
const { default: loggerUtilities } = require("../../../commonUtils/loggerUtil");

class toolshopCartPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.cartItems = page.locator('[data-test="cart-item"], [data-test="product-quantity"]').locator('xpath=ancestor::*[contains(@class,"card") or @data-test="cart-item"]');
    this.cartRows = page.locator('[data-test="product-quantity"]');
    this.proceedToCheckout = page.locator('[data-test="proceed-1"], [data-test="proceed-checkout"]');
    this.cartQuantity = page.locator('[data-test="product-quantity"]');
  }

  async verifyCartHasItems(minCount = 1) {
    await expect(this.cartQuantity.first()).toBeVisible({ timeout: 15000 });
    const count = await this.cartQuantity.count();
    expect(count).toBeGreaterThanOrEqual(minCount);
    this.log.logger(`Cart verified with ${count} item row(s)`);
  }

  async updateItemQuantity(index, quantity) {
    await this.cartQuantity.nth(index).fill(String(quantity));
    await this.cartQuantity.nth(index).blur();
    await this.page.waitForTimeout(500);
    this.log.logger(`Updated cart item ${index} quantity to ${quantity}`);
  }

  async verifyCartQuantity(index, expectedQuantity) {
    await expect(this.cartQuantity.nth(index)).toHaveValue(String(expectedQuantity));
    this.log.logger(`Verified cart item ${index} quantity is ${expectedQuantity}`);
  }

  async proceedToCheckout() {
    await this.proceedToCheckout.click();
    await this.page.waitForURL(/checkout/, { timeout: 15000 });
    this.log.logger("Proceeded to checkout");
  }
}

module.exports = { toolshopCartPage };
