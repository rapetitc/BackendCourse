import ErrorHandler from "../utils/errorsHandler.js";

export default class ProductDTO {
  constructor(product, to) {
    to ? this.#options[to](product) : ErrorHandler.create({ message: "No DTO Selected", code: 0 });
  }
  #options = {
    response: ({ _id, title, description, code, price, status, stock, category, thumbnails, owner }) => {
      this.id = _id;
      this.title = title;
      this.description = description;
      this.code = code;
      this.price = price;
      this.status = status;
      this.stock = stock;
      this.category = category;
      this.thumbnails = thumbnails;
      this.owner = owner;
    },
  };
}
