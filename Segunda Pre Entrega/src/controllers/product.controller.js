import ProductManager from "../services/managers/product.mng.js"
import EvalProdInfo from "../utils/evalEntry.js"

const prodMng = new ProductManager()
const evalProdInfo = new EvalProdInfo

class ProductController {
  addProduct = async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    try {
      const productInfo = evalProdInfo.newEntry({ title, description, code, price, status, stock, category, thumbnails })
      await prodMng.addProduct(productInfo)
      res.status(201).send("Producto agregado satisfactoriamente!")
    } catch (error) { //TODO Personalizar errores
      console.log(error);
      res.status(400).send("Error al intentar agregar producto!")
    }
  }
  getProducts = async (req, res) => {
    const { limit, page, sort, query } = req.query
    try {
      const products = await prodMng.getProducts(limit, page, sort, query)
      res.status(200).send(products)
    } catch (error) {
      console.log(error);
      res.status(400).send("Error al intentar obtener todos los productos!")
    }
  }
  getProduct = async (req, res) => {
    const { pid } = req.params
    try {
      const product = await prodMng.getProduct(pid)
      res.status(200).send(product)
    } catch (error) {
      console.log(error);
      res.status(400).send("Error al intentar obtener el producto!")
    }
  }
  updateProduct = async (req, res) => {
    const { pid } = req.params
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    try {
      const productInfo = evalProdInfo.updateEntry({ title, description, code, price, status, stock, category, thumbnails })
      await prodMng.updateProduct(pid, productInfo)
      res.status(200).send("Producto actualizado satisfactoriamente!")
    } catch (error) {
      console.log(error);
      res.status(400).send("Error al intentar actualizar el producto!")
    }
  }
  removeProduct = async (req, res) => {
    const { pid } = req.params
    try {
      await prodMng.removeProduct(pid)
      res.status(200).send("Producto removido satisfactoriamente!")
    } catch (error) {
      console.log(error);
      res.status(400).send("Error al intentar remover el producto!")
    }
  }
}

export default ProductController