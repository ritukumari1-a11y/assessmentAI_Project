const { expect } = require("@playwright/test");
const { default: loggerUtilities } = require("../../../commonUtils/loggerUtil");

class toolshopInvoicePage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.invoicesMenu = page.locator('[data-test="nav-invoices"], a[href*="invoices"]');
    this.invoiceList = page.locator('[data-test="invoice-list"], table, .invoice-list');
    this.invoiceItem = page.locator("table tbody tr").filter({ hasText: /INV-/ });
    this.invoiceDetailsButton = page.locator("table tbody tr").filter({ hasText: /INV-/ }).getByText(/details/i);
    this.invoiceDetails = page.locator(
      '[data-test="invoice-details"], .invoice-details, h1, h2'
    ).filter({ hasText: /invoice/i });
  }

  async openInvoicesPage() {
    await Promise.all([
      this.page.waitForResponse(
        (resp) => resp.url().includes("invoices") && resp.request().method() === "GET",
        { timeout: 30000 }
      ),
      this.page.goto(`${process.env.TOOLSHOP_BASE_URL}/account/invoices`, {
        waitUntil: "domcontentloaded",
      }),
    ]);
    await this.page.waitForURL(/invoices/, { timeout: 15000 });
    await expect(this.page.getByRole("heading", { name: /invoices/i })).toBeVisible({
      timeout: 15000,
    });
    this.log.logger("Opened My Invoices page");
  }

  async verifyInvoiceVisible() {
    await expect(async () => {
      if ((await this.invoiceItem.count()) === 0) {
        await this.page.reload({ waitUntil: "domcontentloaded" });
        await this.page.waitForResponse(
          (resp) => resp.url().includes("invoices") && resp.request().method() === "GET",
          { timeout: 15000 }
        );
      }
      await expect(this.invoiceItem.first()).toBeVisible({ timeout: 10000 });
    }).toPass({ timeout: 90000 });
    this.log.logger("Invoice list verified with at least one invoice");
  }

  async openFirstInvoice() {
    await this.invoiceDetailsButton.first().click();
    await this.page.waitForURL(/invoice/, { timeout: 15000 });
    this.log.logger("Opened first invoice");
  }

  async verifyInvoiceDetailsVisible() {
    await expect(this.page.getByText(/invoice number/i)).toBeVisible({ timeout: 15000 });
    await expect(this.page.getByText(/billing address/i)).toBeVisible({ timeout: 15000 });
    await expect(this.page.getByRole("button", { name: /download pdf/i })).toBeVisible({
      timeout: 15000,
    });
    this.log.logger("Invoice details verified");
  }
}

module.exports = { toolshopInvoicePage };
