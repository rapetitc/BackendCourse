import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const ProdMng = new ProductManager("./src/db/products.json")
const prodRoutes = Router()

prodRoutes.get("/", async (req, res) => {
  const { limit } = req.query
  try {
    const products = await ProdMng.getProducts()
    if (limit) products = products.slice(0, parseInt(limit))
    res.status(200).send(products)
  } catch (error) {
    res.status(400).send(`Error al intentar obetener productos!. ${error}`)
  }
})
prodRoutes.get("/:pid", async (req, res) => {
  const { pid } = req.params
  try {
    const prodInfo = await ProdMng.getProductById(parseInt(pid))
    if (!prodInfo) throw "Prod/NotFound"
    res.status(200).send(prodInfo)
  } catch (error) {
    if (error == "Prod/NotFound") return res.status(404).send(`Error al intentar obtener producto!. Producto ${pid} no encontrado!.`)
    res.status(400).send(`Error al intentar obtener producto!. ${error}`)
  }
})
prodRoutes.post("/", async (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body
  try {
    await ProdMng.addProduct({ title, description, code, price, status, stock, category, thumbnails })
    res.status(201).send("Producto agregado exitosamente!")
  } catch (error) {
    res.status(400).send(`Error al intentar agregar producto!. ${error}`)
  }
})
prodRoutes.put("/:pid", async (req, res) => {
  const { pid } = req.params
  const info = req.body
  try {
    await ProdMng.updateProduct(parseInt(pid), info)
    res.status(201).send(`Producto ${pid} fue actualizado exitosamente!`)
  } catch (error) {
    if (error == "Prod/NotFound") return res.status(404).send(`Error al intentar actualizar producto!. Producto ${pid} no encontrado!.`)
    res.status(400).send(`Error al intentar actualizar producto!. ${error}`)
  }
})
prodRoutes.delete("/:pid", async (req, res) => {
  const { pid } = req.params
  try {
    await ProdMng.deleteProduct(parseInt(pid))
    res.status(201).send(`Producto ${pid} fue eliminado exitosamente!`)
  } catch (error) {
    if (error == "Prod/NotFound") return res.status(404).send(`Error al intentar eliminar producto!. Producto ${pid} no encontrado!.`)
    res.status(400).send(`Error al intentar eliminar producto!. ${error}`)
  }
})

export default prodRoutes