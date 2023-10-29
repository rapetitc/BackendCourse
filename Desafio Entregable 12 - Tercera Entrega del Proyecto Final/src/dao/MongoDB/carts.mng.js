import CartsModel from "./models/carts.model.js";
import ProductsMng from "./products.mng.js";
import TicketsMng from "./tickets.mng.js"

const productsMng = new ProductsMng
const ticketsMng = new TicketsMng

export default class CartsMng {
  constructor() {
    this.model = CartsModel
  }
  exists = async (id) => {
    return await this.model.exists({ _id: id }) ? true : false
  }
  createCart = async () => {
    const { _id } = await this.model.create({
      storage: [],
      status: "WORKING"
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
  resetCart = async (cid, rejected) => {
    const cart = await this.getCart(cid)
    cart.storage = rejected
    cart.save()
  }
  deleteCart = async (cid) => {
    if (! await this.exists(cid)) throw 'Cart Not Found'
    await CartsModel.findByIdAndDelete(cid)
  }
  updateItemInCart = async (cid, pid, quantity = 0) => {
    if (quantity < 0) throw 'Quantity Is Lower Than Zero'

    const cart = await this.getCart(cid)

    const product = await productsMng.getProduct(pid)
    if (quantity > product.stock) throw "Quantity Is Higher Than Product's Stock"

    let prodInCart = cart.storage.find((prod) => prod.product.toString() == product._id.toString())
    if (prodInCart) {
      if (quantity == 0) cart.storage = cart.storage.filter((prod) => prod.product != pid)
      else prodInCart.quantity = quantity
    } else {
      cart.storage.push({
        product: pid,
        quantity: quantity
      })
    }
    cart.save()
  }
  purchase = async (cid, purchaser) => {
    const { storage } = await this.getCompleteCart(cid)
    const products = []
    const rejected = []
    let totalamount = 0

    for (let i = 0; i < storage.length; i++) {
      const item = storage[i];
      if (item.quantity <= item.product.stock) {
        products.push({
          product: item.product.title,
          price: item.product.price,
          seller: item.product.publisher,
          quantity: item.quantity,
        })
        totalamount += item.product.price * item.quantity
        await productsMng.updateProduct(item.product._id, { stock: item.product.stock - item.quantity })
      } else {
        rejected.push({
          product: item.product._id,
          quantity: item.quantity
        })
      }
    }

    const code = await ticketsMng.generateTicket(products, totalamount, purchaser)
    await this.resetCart(cid, rejected)
    return { code, rejected }
  }
}
