import { CartManager } from "../dao/dao.js"

const cartMng = CartManager()

class CartController {
  addCart = async (req, res) => {
    try {
      const cid = await cartMng.addCart()
      res.status(201).send(cid)
    } catch (error) {
      // console.log(error);
      res.status(400).send("Error al intentar crear un carrito de compras!.")
    }
  }
  getCart = async (req, res) => {
    const { cid } = req.params
    try {
      const cart = await cartMng.getCart(cid)
      if (cart == null) throw 'CartNotFound'
      res.status(200).send(cart)
    } catch (error) {
      console.log(error);
      if (error == 'CartNotFound') return res.status(404).send("El carrito de compra no pudo ser encontrado!.")
      res.status(400).send("Error al intentar buscar el carrito de compras!.")
    }
  }
  updateCart = async (req, res) => {
    const { cid } = req.params
    const { products } = req.body
    try {
      await cartMng.updateCart(cid, products)
      res.status(200).send("Carrito de compras actualizado exitosamente!.")
    } catch (error) {
      // console.log(error);
      res.status(400).send("Error al intentar actualizado el carrito de compras!.")
    }
  }
  deleteCart = async (req, res) => {
    const { cid } = req.params
    try {
      await cartMng.deleteCart(cid)
      res.status(200).send("Carrito de compras eliminado exitosamente!.")
    } catch (error) {
      // console.log(error);
      res.status(400).send("Error al intentar eliminar el carrito de compras!.")
    }
  }
  updateItem = async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body
    try {
      await cartMng.updateItem(cid, pid, quantity)
      res.status(200).send("El articulo fue agregado/actualizado dentro del carrito de compras exitosamente!.")
    } catch (error) {
      console.log(error);
      res.status(400).send("Error al intentar agregar/actualizar el articulo dentro del carrito de compras!.")
    }
  }
  removeItem = async (req, res) => {
    const { cid, pid } = req.params
    try {
      await cartMng.removeItem(cid, pid)
      res.status(200).send("El articulo fue removido del carrito de compras exitosamente!.")
    } catch (error) {
      console.log(error);
      if (error == 'CartNotFound') return res.status(404).send("El carrito de compra no pudo ser encontrado!.")
      res.status(400).send("Error al intentar remover el articulo del carrito de compras!.")
    }
  }
}

export default CartController