import CartsModel from "./models/carts.model.js";
import ProductsModel from "./models/products.model.js";

export default class CartsMng {
  constructor() {
    this.model = CartsModel
  }
  exists = async (id) => {
    return await this.model.exists({ _id: id }) ? true : false
  }
  createCart = async () => {
    const { _id } = await this.model.create({
      storage: []
    })
    return _id
  }
  getCart = async (cid) => {
    if (! await this.exists(cid)) throw 'Cart Not Found'
    return await this.model.findById(cid)
  }
  getCompleteCart = async (cid) => {
    const cart = await this.getCart(cid)
    return cart.populate('storage.product')
  }
  // updateWholeCart = async (cid, products) => {
  //   const cart = await this.getCart(cid)
  //   cart.storage = products
  //   cart.save()
  // }
  deleteCart = async (cid) => {
    if (! await this.exists(cid)) throw 'Cart Not Found'
    await CartsModel.findByIdAndDelete(cid)
  }
  // TODO Refactory
  updateItemInCart = async (cid, pid, quantity = 0) => {
    if (quantity < 0) throw 'Quantity Is Lower Than Zero'
   
    const cart = await this.getCart(cid)

    const product = await ProductsModel.findById(pid)
    if (product == null) throw "Product Not Found"
    if (quantity > product.stock) throw "Quantity Is Higher Than Product's Stock"

    let prodInCart = cart.storage.find((prod) => prod.pid == product._id)
    if (prodInCart) {
      if (quantity == 0) prodInCart = null
      else prodInCart.quantity = quantity
    } else {
      cart.storage.push({
        product: pid,
        quantity: quantity
      })
    }
    cart.save()
  }
}
