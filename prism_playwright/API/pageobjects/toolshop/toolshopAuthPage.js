const { faker } = require("@faker-js/faker");
const registrationTemplate = require("../../../UI/resources/data/toolshop/registrationData.json");

const toolshopAuthPage = {};

toolshopAuthPage.registerEndpoint = "users/register";
toolshopAuthPage.loginEndpoint = "users/login";

toolshopAuthPage.registerHeader = {
  accept: "application/json",
  "Content-Type": "application/json",
};

toolshopAuthPage.loginHeader = {
  accept: "application/json",
  "Content-Type": "application/json",
};

toolshopAuthPage.buildRegisterPayload = (email) => ({
  first_name: registrationTemplate.validUser.firstName,
  last_name: registrationTemplate.validUser.lastName,
  email,
  password: registrationTemplate.validUser.password,
  dob: registrationTemplate.validUser.dob,
  phone: registrationTemplate.validUser.phone,
  address: {
    street: registrationTemplate.validUser.address.street,
    city: registrationTemplate.validUser.address.city,
    state: registrationTemplate.validUser.address.state,
    country: registrationTemplate.validUser.address.country,
    postal_code: registrationTemplate.validUser.address.postal_code,
  },
});

toolshopAuthPage.buildLoginPayload = (email, password) => ({
  email,
  password,
});

toolshopAuthPage.generateUniqueEmail = () =>
  `qa.automation.${faker.string.alphanumeric(8).toLowerCase()}@mailinator.com`;

module.exports = toolshopAuthPage;
