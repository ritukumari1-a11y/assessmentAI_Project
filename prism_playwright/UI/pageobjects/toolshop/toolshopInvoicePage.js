const { expect } = require("@playwright/test");
const { default: loggerUtilities } = require("../../../commonUtils/loggerUtil");

class toolshopInvoicePage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.invoicesMenu = page.locator('[data-test="nav-invoices"], a[href*="invoices"]');
    this.invoiceList = page.locator('[data-test="invoice-list"], table, .invoice-list');
    this.invoiceItem = page.locator('[data-test="invoice-item"], [data-test="invoice-details"], table tbody tr');
    this.invoiceDetails = page.locator('[data-test="invoice-details"], .invoice-details, h1, h2');
  }

  async openInvoicesPage() {
    if (await this.invoicesMenu.count()) {
      await this.invoicesMenu.first().click();
    } else {
      await this.page.goto(`${process.env.TOOLSHOP_BASE_URL}/account/invoices`);
    }
    await this.page.waitForURL(/invoices/, { timeout: 15000 });
    this.log.logger("Opened My Invoices page");
  }

  async verifyInvoiceVisible() {
    await expect(this.invoiceItem.first()).toBeVisible({ timeout: 20000 });
    this.log.logger("Invoice list verified with at least one invoice");
  }

  async openFirstInvoice() {
    await this.invoiceItem.first().click();
    this.log.logger("Opened first invoice");
  }

  async verifyInvoiceDetailsVisible() {
    await expect(this.invoiceDetails.first()).toBeVisible({ timeout: 15000 });
    this.log.logger("Invoice details verified");
  }
}

module.exports = { toolshopInvoicePage };
