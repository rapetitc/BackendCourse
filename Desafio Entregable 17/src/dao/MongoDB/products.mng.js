import ProductsModel from "./models/products.model.js";
import { evalProdInfo } from "../../utils/inputs.eval.js";

export default class ProductsMng {
  constructor() {
    this.model = ProductsModel
  }
  exists = async (filter) => {
    return await this.model.exists(filter) ? true : false
  }
  createProduct = async (productInfo) => {
    const data = await evalProdInfo(productInfo)
    if (await this.exists({ code: productInfo.code })) throw 'Already Exists'
    const { _id } = await this.model.create(data)
    return _id
  }
  getProducts = async (limit = 10, page = 1, sort = {}, query = "") => {
    return await this.model.paginate({ title: new RegExp(query, 'i') }, { page, sort, limit, lean: true });
  }
  getProduct = async (pid) => {
    if (! await this.exists({ _id: pid })) throw 'Product Not Found'
    return await this.model.findById(pid).populate('owner')
  }
  updateProduct = async (pid, newInfo) => {
    if (! await this.exists({ _id: pid })) throw 'Product Not Found'
    const data = await evalProdInfo(newInfo)
    await this.model.findByIdAndUpdate(pid, data)
  }
  deleteProduct = async (pid) => {
    if (! await this.exists({ _id: pid })) throw 'Product Not Found'
    await this.model.findByIdAndRemove(pid)
  }
}
