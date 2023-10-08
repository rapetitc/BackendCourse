import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

class CartManager {
  addCart = async () => {
    const cid = await cartModel.create({
      storage: []
    })
    return cid._id
  }
  getCart = async (cid) => {
    const res = await cartModel.findById(cid)// TODO enviar populate
    return await res.populate('storage.pid')
  }
  updateCart = async (cid, products) => { // TODO Evaluate Products Format
    const cart = await cartModel.findById(cid)
    cart.storage = products
    cart.save()
  }
  deleteCart = async (cid) => {
    await cartModel.findByIdAndDelete(cid)
  }
  updateItem = async (cid, pid, quantity = 0) => { // TODO Recheck
    if (quantity < 0) throw 'QuantityIsLowerThanZero'

    const cart = await cartModel.findById(cid)
    if (cart == null) throw 'CartNotFound'

    const prod = await productModel.findById(pid)
    if (prod == null) throw "ProductNotFound!"

    const prodInCart = cart.storage.find((prod) => prod.pid == pid)
    if (prodInCart) {
      if (quantity < 1) return this.removeItem(cid, pid)
      if (quantity > prod.stock) throw 'QuantityIsHigherThanZero'
      prodInCart.quantity = quantity
    } else {
      cart.storage.push({
        pid: pid,
        quantity: quantity > prod.stock ? prod.stock : quantity
      })
    }
    cart.save()
  }
  removeItem = async (cid, pid) => { // TODO Recheck
    const cart = await cartModel.findById(cid)
    if (cart == null) throw 'CartNotFound'

    cart.storage = cart.storage.filter((prod) => prod.pid != pid)
    cart.save()
  }
}

export default CartManager
