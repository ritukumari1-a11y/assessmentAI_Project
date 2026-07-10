const { navigationBar } = require("./navigationBar");
const { loginPage } = require("./loginPage").default;
const { databaseManager } = require("../utilities/databaseManager");
const { webUtils } = require("../utilities/webUtils");
const { settingPage } = require("./settingPage");
const { districtPage } = require("./districtPage");
const { toolshopPOManager } = require("./toolshop/toolshopPOManager");

/**This is common class to create object and refrences for each page
 *  and then calling getter methods in test cases using POManager*/
class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new loginPage(this.page);
    this.databaseManager = new databaseManager();
    this.navigationBar = new navigationBar(page);
    this.webUtils = new webUtils(page);
    this.databaseManager = new databaseManager(this.page);
    this.settingPage = new settingPage(this.page);
    this.districtPage = new districtPage(this.page);
    this.toolshopManager = new toolshopPOManager(page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getDatabaseManager() {
    return this.databaseManager;
  }

  getNavigationBar() {
    return this.navigationBar;
  }

  getWebUtils() {
    return this.webUtils;
  }

  getSettingPage() {
    return this.settingPage;
  }

  getDistrictPage() {
    return this.districtPage;
  }

  getToolshopRegistrationPage() {
    return this.toolshopManager.getRegistrationPage();
  }

  getToolshopLoginPage() {
    return this.toolshopManager.getLoginPage();
  }

  getToolshopProductPage() {
    return this.toolshopManager.getProductPage();
  }

  getToolshopCartPage() {
    return this.toolshopManager.getCartPage();
  }

  getToolshopCheckoutPage() {
    return this.toolshopManager.getCheckoutPage();
  }

  getToolshopInvoicePage() {
    return this.toolshopManager.getInvoicePage();
  }
}

module.exports = { POManager };
