import { CartManager } from "../dao/dao.js"

const cartMng = CartManager()

class CartController {
  addCart = async (req, res) => {
    try {
      const cid = await cartMng.addCart()
      res.status(201).send(cid)
    } catch (error) {
      console.log(error);
      res.status(400).send("Error al intentar crear un carrito de compras!.")
    }
  }
  getCart = async (req, res) => {
    const { cid } = req.params
    try {
      const cart = await cartMng.getCart(cid)
      res.status(200).send(cart)
    } catch (error) {
      console.log(error);
      res.status(400).send("Error al intentar buscar el carrito de compras!.")
    }
  }
  updateCart = async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
      await cartMng.updateCart(cid, pid, quantity)
      res.status(200).send("Carrito de compras actualizado exitosamente!.")
    } catch (error) {
      console.log(error);
      res.status(400).send("Error al intentar actualizar el carrito de compras!.")
    }
  }
  removeCart = async (req, res) => {
    const { cid } = req.params
    try {
      await cartMng.removeCart(cid)
      res.status(200).send("Carrito de compras eliminado exitosamente!.")
    } catch (error) {
      console.log(error);
      res.status(400).send("Error al intentar eliminar el carrito de compras!.")
    }
  }
}

export default CartController