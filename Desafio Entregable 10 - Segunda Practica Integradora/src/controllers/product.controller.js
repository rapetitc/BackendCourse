import ProductManager  from "../services/managers/product.mng.js"
import { newEntry, updateEntry } from "../utils/inputs.eval.js"

const prodMng = new ProductManager()

class ProductController {
  addProduct = async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    try {
      const productInfo = newEntry({ title, description, code, price, status, stock, category, thumbnails })
      await prodMng.addProduct(productInfo)
      res.status(201).send("Producto agregado satisfactoriamente!")
    } catch (error) {
      // console.log(error);
      res.status(400).send("Error al intentar agregar producto!")
    }
  }
  getProducts = async (req, res) => {
    const { limit, page, sort, query } = req.query
    try {
      const { docs, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } = await prodMng.getProducts(limit, page, sort, query ? JSON.parse(query) : {})
      res.status(200).send({
        status: "success",
        payload: docs,
        page: page ? parseInt(page) : 1,
        totalPages,
        prevPage,
        nextPage,
        hasPrevPage,
        hasNextPage,
        prevLink: hasPrevPage ? `/api/products?page=${prevPage}${sort ? `&sort=${encodeURI(sort)}` : ""}${query ? `&query=${encodeURI(query)}` : ""}` : null,
        nextLink: hasNextPage ? `/api/products?page=${nextPage}${sort ? `&sort=${encodeURI(sort)}` : ""}${query ? `&query=${encodeURI(query)}` : ""}` : null,
      })
    } catch (error) {
      console.log(error);
      res.status(400).send("Error al intentar obtener los productos!")
    }
  }
  getProduct = async (req, res) => {
    const { pid } = req.params
    try {
      const product = await prodMng.getProduct(pid)
      res.status(200).send(product)
    } catch (error) {
      // console.log(error);
      res.status(400).send("Error al intentar obtener el producto!")
    }
  }
  updateProduct = async (req, res) => {
    const { pid } = req.params
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    try {
      const productInfo = updateEntry({ title, description, code, price, status, stock, category, thumbnails })
      await prodMng.updateProduct(pid, productInfo)
      res.status(200).send("Producto actualizado satisfactoriamente!")
    } catch (error) {
      // console.log(error);
      res.status(400).send("Error al intentar actualizar el producto!")
    }
  }
  removeProduct = async (req, res) => {
    const { pid } = req.params
    try {
      await prodMng.removeProduct(pid)
      res.status(200).send("Producto removido satisfactoriamente!")
    } catch (error) {
      // console.log(error);
      res.status(400).send("Error al intentar remover el producto!")
    }
  }
}

export default ProductController