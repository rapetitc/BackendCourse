import ErrorHandler from "../../utils/errorsHandler.js";
import ProductsModel from "./models/products.model.js";

export default class ProductsMng {
  constructor() {
    this.model = ProductsModel;
  }
  exists = async (filter) => {
    return (await this.model.exists(filter)) ? true : false;
  };
  createProduct = async (productInfo) => {
    const product = new this.model(productInfo);
    await product.validate().catch((error) => {
      const keys = Object.keys(error.errors);
      const cause = {};
      keys.forEach((key) => {
        cause[key] = error.errors[key].kind;
      });
      ErrorHandler.create({ code: 4, cause });
    });
    if (await this.exists({ code: product.code })) ErrorHandler.create({ code: 10 });
    await product.save();
    return product;
  };
  getProducts = async (limit = 10, page = 1, sort = {}, query) => {
    return await this.model.paginate(query, { page, sort, limit, lean: true });
  };
  getProduct = async (pid) => {
    if (!(await this.exists({ _id: pid }))) ErrorHandler.create({ code: 12 });
    return await this.model.findById(pid);
  };
  updateProduct = async (pid, newInfo) => {
    for (const key in newInfo) {
      if (newInfo[key] === undefined || newInfo[key] === null) delete newInfo[key];
    }
    if (Object.entries(newInfo).length === 0) ErrorHandler.create({ code: 5 });

    const product = await this.model.findOneAndUpdate({ _id: pid }, { $set: newInfo }, { new: true, runValidators: true }).catch((error) => {
      const cause = {};
      if (error.errors) {
        const keys = Object.keys(error.errors);
        keys.forEach((key) => {
          cause[key] = error.errors[key].kind;
        });
      } else {
        cause[error.path] = error.kind;
      }
      ErrorHandler.create({ code: 4, cause });
    });
    if (!product) ErrorHandler.create({ code: 12 });
    return product;
  };
  deleteProduct = async (pid) => {
    if (!(await this.exists({ _id: pid }))) ErrorHandler.create({ code: 12 });
    await this.model.findByIdAndDelete(pid);
  };
}
