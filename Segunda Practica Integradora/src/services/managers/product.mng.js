import productModel from "../models/product.model.js";

class ProductManager {
  addProduct = async (productInfo) => {
    await productModel.create(productInfo)
  }
  getProducts = async (limit = 10, page = 1, sort = {}, query = {}) => {
    return await productModel.paginate(query, { page, sort, limit, lean: true });
  }
  getProduct = async (pid) => {
    return await productModel.findById(pid)
  }
  updateProduct = async (pid, newProductInfo) => {
    await productModel.findByIdAndUpdate(pid, newProductInfo)
  }
  removeProduct = async (pid) => {
    await productModel.findByIdAndRemove(pid)
  }
}

export default ProductManager