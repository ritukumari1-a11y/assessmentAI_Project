const { toolshopData } = require("../../utilities/toolshopDynamicData");
const invoiceTemplate = require("../../testdata/toolshop/invoicePayload.json");

const toolshopInvoicePage = {};

toolshopInvoicePage.createInvoiceEndpoint = "invoices";

toolshopInvoicePage.authHeader = () => ({
  accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${toolshopData.accessToken}`,
});

toolshopInvoicePage.buildInvoicePayload = (cartId) => ({
  ...invoiceTemplate.invoicePayload,
  cart_id: cartId,
});

module.exports = toolshopInvoicePage;
