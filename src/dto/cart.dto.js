import ErrorHandler from "../utils/errorsHandler.js";

export default class CartDTO {
  constructor(product, to) {
    to ? this.#options[to](product) : ErrorHandler.create({ message: "No DTO Selected", code: 0 });
  }
  #options = {
    response: ({ _id, storage }) => {
      this.id = _id;
      this.storage = storage;
    },
  };
}
