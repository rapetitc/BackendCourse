import CartsMng from "../services/carts.mng.js"

const cartsMng = new CartsMng

export default class CartsCtrlr {
  createCart = async (req, res) => {
    try {
      res.sendCreated(await cartsMng.createCart())
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
  getCart = async (req, res) => {
    const { cid } = req.params
    try {
      res.sendSuccess(await cartsMng.getCompleteCart(cid))
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
  // updateCart = async (req, res) => {
  //   const { cid } = req.params
  //   const { products } = req.body
  //   try {
  //     await cartsMng.updateCart(cid, products)
  //     res.status(200).send("Carrito de compras actualizado exitosamente!.")
  //   } catch (error) {
  //     // console.log(error);
  //     res.sendServerError()
  //   }
  // }
  deleteCart = async (req, res) => {
    const { cid } = req.params
    try {
      await cartsMng.deleteCart(cid)
      res.sendSuccess()
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
  // TODO Refactory
  // updateItem = async (req, res) => {
  //   const { cid, pid } = req.params
  //   const { quantity } = req.body
  //   try {
  //     await cartsMng.updateItem(cid, pid, quantity)
  //     res.status(200).send("El articulo fue agregado/actualizado dentro del carrito de compras exitosamente!.")
  //   } catch (error) {
  //     // console.log(error);
  //     res.sendServerError()
  //   }
  // }
  // removeItem = async (req, res) => {
  //   const { cid, pid } = req.params
  //   try {
  //     await cartsMng.removeItem(cid, pid)
  //     res.status(200).send("El articulo fue removido del carrito de compras exitosamente!.")
  //   } catch (error) {
  //     // console.log(error);
  //     res.sendServerError()
  //   }
  // }
}
