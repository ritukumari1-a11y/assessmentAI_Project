const { toolshopData } = require("../../utilities/toolshopDynamicData");

const toolshopCartPage = {};

toolshopCartPage.createCartEndpoint = "carts";
toolshopCartPage.addToCartEndpoint = (cartId) => `carts/${cartId}`;
toolshopCartPage.getCartEndpoint = (cartId) => `carts/${cartId}`;

toolshopCartPage.authHeader = () => ({
  accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${toolshopData.accessToken}`,
});

toolshopCartPage.buildAddToCartPayload = (productId, quantity = 1) => ({
  product_id: productId,
  quantity,
});

module.exports = toolshopCartPage;
