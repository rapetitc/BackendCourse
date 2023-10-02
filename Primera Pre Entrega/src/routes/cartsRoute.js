import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const CartMng = new CartManager("./src/db/carts.json")
const cartsRoutes = Router()

cartsRoutes.post("/", async (req, res) => {
  try {
    const id = await CartMng.addCart()
    res.status(201).send(`Carrito fue creado exitosamente!. ID asignado: ${id}.`)
  } catch (error) {
    res.status(400).send(`Error al intentar crear un nuevo carrito!.`)
  }
})
cartsRoutes.get("/:cid", async (req, res) => {
  const { cid } = req.params
  try {
    const cartInfo = await CartMng.getCartById(parseInt(cid))
    if (!cartInfo) throw "Cart/NotFound"
    res.status(200).send(cartInfo)
  } catch (error) {
    if (error == "Cart/NotFound") return res.status(404).send(`Error al intentar obtener el carrito!. Carrito no encontrado!.`)
    res.status(400).send(`Error al intentar obtener el carrito!.`)
  }
})
cartsRoutes.put("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params
  const { quantity } = req.body
  try {
    await CartMng.addProductToCart(parseInt(cid), parseInt(pid), parseInt(quantity))
    res.status(201).send("Producto agregado a tu carrito exitosamente!")
  } catch (error) {
    if (error == "Cart/NotFound") return res.status(404).send(`Error al intentar agregar producto al carrito!. Carrito ${cid} no encontrado!.`)
    if (error == "Prod/NotFound") return res.status(404).send(`Error al intentar agregar producto al carrito!. Producto ${pid} no encontrado!.`)
    res.status(400).send(`Error al intentar agregar producto al carrito!. ${error}`)
  }
})
cartsRoutes.delete("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params
  try {
    await CartMng.deleteProductFromCart(cid, pid)
    res.status(201).send("Producto removido de tu carrito exitosamente!")
  } catch (error) {
    if (error == "Cart/NotFound") return res.status(404).send(`Error al intentar agregar producto al carrito!. Carrito ${cid} no encontrado!.`)
    res.status(401).send(`Error al intentar remover producto del carrito!`)
  }
})

export default cartsRoutes