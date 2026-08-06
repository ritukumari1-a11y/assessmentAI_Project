const { expect } = require("@playwright/test");
require("dotenv").config();
const { default: loggerUtilities } = require("../../../commonUtils/loggerUtil");

class toolshopRegistrationPage {
  constructor(page) {
    this.page = page;
    this.log = new loggerUtilities();
    this.registrationForm = page.locator("form").filter({
      has: page.locator('[data-test="register-submit"]'),
    });
    this.firstName = this.registrationForm.locator('[data-test="first-name"]');
    this.lastName = this.registrationForm.locator('[data-test="last-name"]');
    this.email = this.registrationForm.locator('[data-test="email"]');
    this.password = this.registrationForm.locator('[data-test="password"]');
    this.dob = this.registrationForm.locator('[data-test="dob"]');
    this.phone = this.registrationForm.locator('[data-test="phone"]');
    this.street = this.registrationForm.locator('[data-test="street"]');
    this.city = this.registrationForm.locator('[data-test="city"]');
    this.state = this.registrationForm.locator('[data-test="state"]');
    this.country = this.registrationForm.locator('[data-test="country"]');
    this.postalCode = this.registrationForm.locator('[data-test="postal_code"]');
    this.houseNumber = this.registrationForm.locator('[data-test="house_number"]');
    this.registerButton = page.locator('[data-test="register-submit"]');
    this.successMessage = page.locator('[data-test="register-success"], .alert-success');
  }

  async goto() {
    await this.page.goto(`${process.env.TOOLSHOP_BASE_URL}/auth/register`);
    await expect(this.registrationForm).toBeVisible({ timeout: 15000 });
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
    await this.country.selectOption({ value: userData.address.countryCode || userData.address.country });
    await this.postalCode.fill(userData.address.postal_code);
    await this.houseNumber.fill(userData.address.house_number);
    await this.street.fill(userData.address.street);
    await this.city.fill(userData.address.city);
    await this.state.fill(userData.address.state);
    await Promise.all([
      this.page.waitForResponse(
        (resp) => resp.url().includes("users/register") && resp.request().method() === "POST",
        { timeout: 30000 }
      ),
      this.registerButton.click(),
    ]);
    this.log.logger(`Registered user with email: ${email}`);
  }

  async verifyRegistrationSuccess() {
    await this.page.waitForURL(/\/auth\/login/, { timeout: 45000 });
    this.log.logger("Registration success verified");
  }
}

module.exports = { toolshopRegistrationPage };
