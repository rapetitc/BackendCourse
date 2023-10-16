import ProductsMng from "../services/products.mng.js"
import { evalProdInfo } from '../utils/inputs.eval.js'

const productsMng = new ProductsMng

export default class ProductsCtrlr {
  createProduct = async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    try {
      const productInfo = await evalProdInfo({ title, description, code, price, stock, category, thumbnails: [''] })
      const id = await productsMng.createProduct({ ...productInfo, publisher: req.user._id })
      res.sendCreated({
        payload: id
      })
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
  getProducts = async (req, res) => {
    const { limit, page, sort, query } = req.query
    console.log("getProducts");
    try {
      const { docs, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } = await productsMng.getProducts(limit, page, sort, query ? JSON.parse(query) : {})
      res.sendSuccess({
        status: "success",
        payload: docs,
        currentPage: page ? parseInt(page) : 1,
        totalPages,
        prevPage,
        nextPage,
        hasPrevPage,
        hasNextPage
      })
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
  getProduct = async (req, res) => {
    console.log("getProduct");
    const { pid } = req.params
    try {
      res.sendSuccess({
        payload: await productsMng.getProduct(pid)
      })
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
  updateProduct = async (req, res) => {
    const { pid } = req.params
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    try {
      const productInfo = await evalProdInfo({ title, description, code, price, status, stock, category, thumbnails })
      await productsMng.updateProduct(pid, productInfo)
      res.sendSuccess({})
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
  removeProduct = async (req, res) => {
    const { pid } = req.params
    try {
      await productsMng.deleteProduct(pid)
      res.sendSuccess({})
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
}
