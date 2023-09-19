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
    return await cartModel.findById(cid).populate('storage')
  }
  addItemToCart = async (cid, pid) => {
    if (await cartModel.exists({ _id: cid }) == null) throw "Cart not found!"
    const cart = await cartModel.findById(cid)

    if (await productModel.exists({ _id: pid }) == null) throw "Product not found!"
    const prod = cart.storage.find((prod) => prod.pid == pid)

    if (prod) {
      prod.quantity += 1
    } else {
      cart.storage.push({
        pid: pid,
        quantity: 1
      })
    }
    cart.save()
  }
  removeItemFromCart = async (cid, pid) => {
    if (await cartModel.exists({ _id: cid }) == null) throw "Cart not found!"
    const cart = await cartModel.findById(cid)

    if (await productModel.exists({ _id: pid }) == null) throw "Product not found!"
    const prod = cart.storage.find((prod) => prod.pid == pid)

    cart.storage = cart.storage.filter((prod) => prod.pid != pid)
    cart.save()
  }
  removeCart = async (cid) => {
    await cartModel.findByIdAndDelete(cid)
  }
}

export default CartManager
