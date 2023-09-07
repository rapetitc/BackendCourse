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
  updateCart = async (cid, pid, quantity) => {
    if (await cartModel.exists({ _id: cid }) == null) throw "Cart not found!"
    const cart = await cartModel.findById(cid)

    if (await productModel.exists({ _id: pid }) == null) throw "Product not found!"
    const prod = cart.storage.find((prod) => prod.pid == pid)
    console.log(quantity);
    if (prod) {
      if (quantity > 0) prod.quantity = quantity
      else cart.storage = cart.storage.filter((prod) => prod.pid != pid)
    } else {
      cart.storage.push({
        pid: pid,
        quantity: quantity
      })
    }
    cart.save()
  }
  removeCart = async (cid) => {
    await cartModel.findByIdAndDelete(cid)
  }
}

export default CartManager
