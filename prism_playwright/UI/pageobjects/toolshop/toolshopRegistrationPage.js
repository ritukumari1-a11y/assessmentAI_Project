const { expect } = require("@playwright/test");
require("dotenv").config();
const { default: loggerUtilities } = require("../../../commonUtils/loggerUtil");

class toolshopRegistrationPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.firstName = page.locator('[data-test="first-name"]');
    this.lastName = page.locator('[data-test="last-name"]');
    this.email = page.locator('[data-test="email"]');
    this.password = page.locator('[data-test="password"]');
    this.dob = page.locator('[data-test="dob"]');
    this.phone = page.locator('[data-test="phone"]');
    this.street = page.locator('[data-test="street"]');
    this.city = page.locator('[data-test="city"]');
    this.state = page.locator('[data-test="state"]');
    this.country = page.locator('[data-test="country"]');
    this.postalCode = page.locator('[data-test="postal_code"]');
    this.registerButton = page.locator('[data-test="register-submit"]');
    this.successMessage = page.locator('[data-test="register-success"], .alert-success, [role="alert"]');
  }

  async goto() {
    await this.page.goto(`${process.env.TOOLSHOP_BASE_URL}/auth/register`);
    await expect(this.firstName).toBeVisible({ timeout: 15000 });
    this.log.logger("Navigated to Toolshop registration page");
  }

  async registerUser(userData, email) {
    await this.firstName.fill(userData.firstName);
    await this.lastName.fill(userData.lastName);
    await this.email.fill(email);
    await this.password.fill(userData.password);
    await this.dob.fill(userData.dob);
    await this.phone.fill(userData.phone);
    await this.street.fill(userData.address.street);
    await this.city.fill(userData.address.city);
    await this.state.fill(userData.address.state);
    await this.country.selectOption({ label: userData.address.country });
    await this.postalCode.fill(userData.address.postal_code);
    await this.registerButton.click();
    this.log.logger(`Registered user with email: ${email}`);
  }

  async verifyRegistrationSuccess() {
    await this.page.waitForURL(/auth\/login|register/, { timeout: 20000 });
    const onLoginPage = this.page.url().includes("/auth/login");
    if (onLoginPage) {
      this.log.logger("Registration success - redirected to login page");
      return;
    }
    await expect(this.successMessage.first()).toBeVisible({ timeout: 15000 });
    this.log.logger("Registration success message verified");
  }
}

module.exports = { toolshopRegistrationPage };
