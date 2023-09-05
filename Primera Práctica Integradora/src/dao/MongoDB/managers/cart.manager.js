import cartModel from "../models/cart.model.js";

class cartManager {
  createCart = () => {
    cartModel.create({
      storage: []
    })
  }
  updateCart = (ID, newCartInfo) => {
    cartModel.updateOne(ID, newCartInfo)
  }
}

export default cartManager