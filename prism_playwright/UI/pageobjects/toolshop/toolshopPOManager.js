const { toolshopRegistrationPage } = require("./toolshopRegistrationPage");
const { toolshopLoginPage } = require("./toolshopLoginPage");
const { toolshopProductPage } = require("./toolshopProductPage");
const { toolshopCartPage } = require("./toolshopCartPage");
const { toolshopCheckoutPage } = require("./toolshopCheckoutPage");
const { toolshopInvoicePage } = require("./toolshopInvoicePage");

class toolshopPOManager {
  constructor(page) {
    this.page = page;
    this.registrationPage = new toolshopRegistrationPage(page);
    this.loginPage = new toolshopLoginPage(page);
    this.productPage = new toolshopProductPage(page);
    this.cartPage = new toolshopCartPage(page);
    this.checkoutPage = new toolshopCheckoutPage(page);
    this.invoicePage = new toolshopInvoicePage(page);
  }

  getRegistrationPage() {
    return this.registrationPage;
  }

  getLoginPage() {
    return this.loginPage;
  }

  getProductPage() {
    return this.productPage;
  }

  getCartPage() {
    return this.cartPage;
  }

  getCheckoutPage() {
    return this.checkoutPage;
  }

  getInvoicePage() {
    return this.invoicePage;
  }
}

module.exports = { toolshopPOManager };
