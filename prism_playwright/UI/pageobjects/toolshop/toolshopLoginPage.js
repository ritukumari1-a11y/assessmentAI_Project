const { expect } = require("@playwright/test");
require("dotenv").config();
const { default: loggerUtilities } = require("../../../commonUtils/loggerUtil");

class toolshopLoginPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.email = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-submit"]');
    this.profileMenu = page.locator('[data-test="nav-profile"]');
    this.profileDropdown = page.locator('[data-test="nav-menu"]');
    this.profileLink = page.locator('[data-test="nav-profile-menu"], a[href*="profile"]');
    this.profileFirstName = page.locator('[data-test="first-name"]');
    this.profileLastName = page.locator('[data-test="last-name"]');
    this.profileEmail = page.locator('[data-test="email"]');
    this.loginError = page.locator('[data-test="login-error"], .alert-danger, [role="alert"]');
  }

  async goto() {
    await this.page.goto(`${process.env.TOOLSHOP_BASE_URL}/auth/login`);
    await expect(this.email).toBeVisible({ timeout: 15000 });
    this.log.logger("Navigated to Toolshop login page");
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginButton.click();
    this.log.logger(`Logged in with email: ${email}`);
  }

  async verifyLoginSuccess(expectedName) {
    await expect(this.profileMenu).toBeVisible({ timeout: 20000 });
    if (expectedName) {
      await expect(this.profileMenu).toContainText(expectedName);
    }
    this.log.logger("Login success verified via profile menu");
  }

  async verifyLoginFailure() {
    await expect(this.profileMenu).not.toBeVisible({ timeout: 10000 });
    const hasError = (await this.loginError.count()) > 0;
    const onLoginPage = this.page.url().includes("/auth/login");
    expect(hasError || onLoginPage).toBeTruthy();
    this.log.logger("Login failure verified — error shown or user remains on login page");
  }

  async verifyProfileInformation(firstName, lastName, email) {
    await this.openProfileMenu();
    if (await this.profileLink.count()) {
      await this.profileLink.first().click();
    } else {
      await this.page.goto(`${process.env.TOOLSHOP_BASE_URL}/account/profile`);
    }
    await expect(this.profileFirstName).toHaveValue(firstName, { timeout: 15000 });
    await expect(this.profileLastName).toHaveValue(lastName);
    await expect(this.profileEmail).toHaveValue(email);
    this.log.logger("Profile information verified successfully");
  }

  async openProfileMenu() {
    await this.profileMenu.click();
    await expect(this.profileDropdown).toBeVisible({ timeout: 10000 });
    this.log.logger("Opened profile menu");
  }
}

module.exports = { toolshopLoginPage };
