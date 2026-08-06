const { toolshopData } = require("../../utilities/toolshopDynamicData");

const toolshopProductPage = {};

toolshopProductPage.getProductsEndpoint = "products";

toolshopProductPage.getProductsSearchEndpoint = (searchTerm) =>
  `products?search=${encodeURIComponent(searchTerm)}`;

toolshopProductPage.authHeader = () => ({
  accept: "application/json",
  Authorization: `Bearer ${toolshopData.accessToken}`,
});

module.exports = toolshopProductPage;
