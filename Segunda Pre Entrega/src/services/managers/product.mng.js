import productModel from "../models/product.model.js";

class ProductManager {
  addProduct = async (productInfo) => {
    await productModel.create(productInfo)
  }
  getProducts = async (limit = 100, page = 1, sort = 'desc', query = {}) => {
    let result = await productModel.paginate(query, { page, limit, lean: true });

    result.prevLink = result.hasPrevPage ? `http://localhost:8080/api/products?limit=1&page=${result.prevPage}` : '';
    result.nextLink = result.hasNextPage ? `http://localhost:8080/api/products?limit=1&page=${result.nextPage}` : '';
    result.isValid = !(page <= 0 || page > result.totalPages)

    return result
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