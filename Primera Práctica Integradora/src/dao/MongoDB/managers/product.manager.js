import productModel from "../models/product.model.js";

class ProductManager {
  addProduct = async (productInfo) => {
    productModel.create(productInfo)
  }
  getProducts = async (query = {}) => {
    const products = await productModel.find(query)
    return products
  }
  getProduct = async (pid) => {
    const product = await productModel.findById(pid)
    return product
  }
  updateProduct = async (ID, newProductInfo) => {
    const product = await productModel.findByIdAndUpdate(ID, newProductInfo)
    console.log(product);
  }
  removeProduct = async (ID) => {
    await productModel.findByIdAndRemove(ID)
    console.log("Producto eliminado");
  }
}

export default ProductManager