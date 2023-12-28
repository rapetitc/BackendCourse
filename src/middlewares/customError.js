const ErrorDict = [
  (res) => {
    res.sendServerError();
  },
  (res) => {
    res.sendUnauthorized();
  },
  (res) => {
    res.sendNotFound({ error: "USER_NOT_FOUND" });
  },
  (res) => {
    res.sendBadRequest({ error: "USER_ALREADY_EXISTS" });
  },
  (res, cause) => {
    res.sendBadRequest({ error: "INVALID_TYPES", ...cause });
  },
  (res) => {
    res.sendBadRequest({ error: "NO_INFO_TO_UPDATE" });
  },
  (res) => {
    res.sendBadRequest({ error: "NO_FILES_TO_UPLOAD" });
  },
  (res, cause) => {
    res.sendForbiden({ error: "USER_NOT_VERIFIED", ...cause });
  },
  (res) => {
    res.sendBadRequest({ error: "NO_ACTIVE_SESSION" });
  },
  (res) => {
    res.sendBadRequest({ error: "SAME_CURRENT_PASSWORD" });
  },
  (res) => {
    res.sendBadRequest({ error: "PRODUCT_ALREADY_EXISTS" });
  },
  (res) => {
    res.sendNotFound({ error: "PRODUCTS_NOT_FOUND" });
  },
  (res) => {
    res.sendNotFound({ error: "PRODUCT_NOT_FOUND" });
  },
  (res) => {
    res.sendNotFound({ error: "CART_NOT_FOUND" });
  },
  (res) => {
    res.sendBadRequest({ error: "OWNER_ CANNOT_ADD_ITS_OWN_PRODUCT" });
  },
  (res) => {
    res.sendBadRequest({ error: "QUANTITY_IS_LOWER_THAN_ZERO" });
  },
  (res) => {
    res.sendBadRequest({ error: "QUANTITY_IS_HIGHER_THAN_STOCK_AVAILABLE" });
  },
];

export default (error, req, res, next) => {
  if (ErrorDict[error.code]) {
    ErrorDict[error.code](res, { cause: error.cause });
  } else {
    req.logger.fatal(error);
    ErrorDict[0](res);
  }
};
