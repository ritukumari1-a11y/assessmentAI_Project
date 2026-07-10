class ToolshopDynamicData {
  constructor() {
    this._accessToken = null;
    this._cartId = null;
    this._userEmail = null;
    this._productId = null;
    this._invoiceId = null;
  }

  get accessToken() {
    return this._accessToken;
  }

  set accessToken(token) {
    this._accessToken = token;
  }

  get cartId() {
    return this._cartId;
  }

  set cartId(id) {
    this._cartId = id;
  }

  get userEmail() {
    return this._userEmail;
  }

  set userEmail(email) {
    this._userEmail = email;
  }

  get productId() {
    return this._productId;
  }

  set productId(id) {
    this._productId = id;
  }

  get invoiceId() {
    return this._invoiceId;
  }

  set invoiceId(id) {
    this._invoiceId = id;
  }
}

const toolshopData = new ToolshopDynamicData();

module.exports = { toolshopData };
