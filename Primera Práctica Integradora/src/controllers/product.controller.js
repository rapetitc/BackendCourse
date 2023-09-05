import ProductManager from "../dao/MongoDB/managers/product.manager.js"

const productManager = new ProductManager

class ProductController {
  addProduct = async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    const productInfo = { title, description, code, price, status, stock, category, thumbnails } //TODO Validar formato entrante
    try {
      await productManager.addProduct(productInfo)
      res.status(201).send("Producto agregado satisfactoriamente!")
    } catch (error) {
      res.status(400).send("Error al intentar agregar un producto!")
    }
  }
  getProducts = async (req, res) => {
    const { query } = req //TODO
    console.log(query);
    try {
      const products = await productManager.getProducts(query)
      res.status(200).send(products)
    } catch (error) {
      res.status(400).send("Error al intentar obtener todos los productos!")
    }
  }
  getProduct = async (req, res) => {
    const { pid } = req.params
    try {
      const product = await productManager.getProduct(pid)
      res.status(200).send(product)
    } catch (error) {
      res.status(400).send("Error al intentar obtener el producto!")
    }
  }
  updateProduct = async (req, res) => {
    const { pid } = req.params
    const { newProdInfo } = req.body //TODO Validar formato entrante
    try {
      productManager.updateProduct(pid, newProdInfo)
      res.status(200).send("Producto actualizado satisfactoriamente!")
    } catch (error) {
      res.status(400).send("Error al intentar actualizar el producto!")
    }
  }
  removeProduct = async (req, res) => {
    const { pid } = req.params
    try {
      productManager.removeProduct(pid)
      res.status(200).send("Producto removido satisfactoriamente!")
    } catch (error) {
      res.status(400).send("Error al intentar remover el producto!")
    }
  }
}

export default ProductController