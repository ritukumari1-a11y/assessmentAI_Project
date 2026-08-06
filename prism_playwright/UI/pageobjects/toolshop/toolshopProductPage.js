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
    const apiBase = process.env.TOOLSHOP_API_URL;
    const response = await this.page.request.get(`${apiBase}/products`, {
      headers: { accept: "application/json" },
    });
    const products = (await response.json()).data || [];
    const addedProductIds = new Set();

    for (const product of products) {
      if (addedProductIds.size >= count) break;

      await this.page.goto(`${process.env.TOOLSHOP_BASE_URL}/product/${product.id}`);
      await expect(this.productName).toBeVisible({ timeout: 15000 });

      if (await this.page.getByText(/out of stock/i).isVisible().catch(() => false)) {
        continue;
      }

      const addButton = this.addToCartButtons.first();
      if (!(await addButton.isEnabled({ timeout: 3000 }).catch(() => false))) {
        continue;
      }

      const addResponse = await Promise.all([
        this.page.waitForResponse(
          (resp) =>
            resp.url().includes("carts") &&
            ["POST", "PUT", "PATCH"].includes(resp.request().method()) &&
            resp.ok(),
          { timeout: 20000 }
        ),
        addButton.click(),
      ]);
      expect(addResponse[0].ok()).toBeTruthy();
      addedProductIds.add(product.id);
      await this.page.waitForTimeout(2500);
    }

    expect(addedProductIds.size).toBe(count);

    await this.goToCart();
    await expect(async () => {
      await this.page.reload();
      await expect(this.page.locator('[data-test="product-quantity"]').first()).toBeVisible({
        timeout: 5000,
      });
      expect(await this.page.locator('[data-test="product-quantity"]').count()).toBeGreaterThanOrEqual(
        count
      );
    }).toPass({ timeout: 60000 });

    this.log.logger(`Added ${addedProductIds.size} product(s) to cart`);
  }

  async goToCart() {
    const cartNav = this.page.locator('[data-test="nav-cart"], a[href*="checkout"]');
    if ((await cartNav.count()) > 0 && (await cartNav.first().isVisible())) {
      await cartNav.first().click();
    } else {
      await this.page.goto(`${process.env.TOOLSHOP_BASE_URL}/checkout`);
    }
    await this.page.waitForURL(/cart|checkout/, { timeout: 15000 });
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
