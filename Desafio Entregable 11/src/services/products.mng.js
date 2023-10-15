import ProductsModel from "./models/products.model.js";

export default class ProductsMng {
  constructor() {
    this.model = ProductsModel
  }
  exists = async (filter) => {
    return await this.model.exists(filter) ? true : false
  }
  createProduct = async (productInfo) => {
    const { _id } = this.model.create(productInfo)
    return _id
  }
  getProducts = async (limit = 10, page = 1, sort = {}, query = {}) => {
    return await this.model.paginate(query, { page, sort, limit, lean: true });
  }
  getProduct = async (pid) => {
    if (!this.exists({ _id: pid })) throw 'Product Not Found'
    return await this.model.findById(pid)
  }
  updateProduct = async (pid, newInfo) => {
    const product = await this.getProduct(pid)
    const keys = Object.keys(newInfo)
    for (const key of keys) {
      product[key] = newInfo[key]
    }
    product.save()
  }
  deleteProduct = async (pid) => {
    if (!this.exists({ _id: pid })) throw 'Product Not Found'
    await this.model.findByIdAndRemove(pid)
  }
}
