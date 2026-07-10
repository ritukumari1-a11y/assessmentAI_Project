const { expect } = require("@playwright/test");
require("dotenv").config();
const { default: loggerUtilities } = require("../../../commonUtils/loggerUtil");

class toolshopProductPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.productCards = page.locator('[data-test="product-card"], .card');
    this.addToCartButtons = page.locator('[data-test="add-to-cart"]');
    this.cartLink = page.locator('[data-test="nav-cart"]');
    this.productName = page.locator('[data-test="product-name"]');
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
  }

  async goto() {
    await this.page.goto(process.env.TOOLSHOP_BASE_URL);
    this.log.logger("Navigated to Toolshop home/products page");
  }

  async verifyProductsVisible() {
    await expect(this.productCards.first()).toBeVisible({ timeout: 15000 });
    const count = await this.productCards.count();
    expect(count).toBeGreaterThan(0);
    this.log.logger(`Products visible on listing page: ${count}`);
  }

  async addMultipleProductsToCart(count = 2) {
    const buttons = this.addToCartButtons;
    const total = await buttons.count();
    const itemsToAdd = Math.min(count, total);
    for (let i = 0; i < itemsToAdd; i++) {
      await buttons.nth(i).click();
      await this.page.waitForTimeout(800);
    }
    this.log.logger(`Added ${itemsToAdd} product(s) to cart`);
  }

  async goToCart() {
    await this.cartLink.click();
    await this.page.waitForURL(/cart/, { timeout: 15000 });
    this.log.logger("Navigated to cart page");
  }

  async searchProduct(query) {
    await expect(this.searchInput).toBeVisible({ timeout: 15000 });
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.page.waitForTimeout(1000);
    this.log.logger(`Searched for product: ${query}`);
  }

  async verifySearchResultsContain(query) {
    await expect(this.productCards.first()).toBeVisible({ timeout: 15000 });
    const names = await this.productName.allTextContents();
    const matchFound = names.some((name) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
    expect(matchFound).toBeTruthy();
    this.log.logger(`Search results contain product matching: ${query}`);
  }
}

module.exports = { toolshopProductPage };
