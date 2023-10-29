import ProductsMng from "../dao/MongoDB/products.mng.js"

const productsMng = new ProductsMng

export default class ProductsCtrlr {
  createProduct = async (req, res) => {
    const { title, description, code, price, stock, category } = req.body
    try {
      const pid = await productsMng.createProduct({ _id: req.pid, title, description, code, price: parseInt(price), stock: parseInt(stock), category, thumbnails: req.files.map(file => `/storage/${req.pid}/${file.filename}`), publisher: req.user._id })
      res.sendCreated({ payload: pid })
    } catch (error) {
      if (error.message == "Invalid Product Info Format") return res.sendBadRequest({ msg: "Invalid product info format", causes: [...error.cause] })

      console.log(error);
      res.sendServerError()
    }
  }
  getProducts = async (req, res) => {
    const { limit, page, sort, query } = req.query
    try {
      const { docs, totalPages, prevPage, nextPage, hasPrevPage, hasNextPage } = await productsMng.getProducts(limit, page, sort, query)
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
    const { pid } = req.params
    try {
      const product = await productsMng.getProduct(pid)
      product.updatedAt = undefined
      product.__v = undefined
      res.sendSuccess({ payload: product })
    } catch (error) {
      if (error == 'Product Not Found') return res.sendNotFound({ msg: "Producto no encontrado" })

      console.log(error);
      res.sendServerError()
    }
  }
  // TODO ↓↓↓ Test Code
  updateProduct = async (req, res) => {
    const { pid } = req.params
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    const data = { title, description, code, price, status, stock, category, thumbnails }
    let newProductInfo = {}
    for (const key in data) {
      if (data[key] !== undefined || data[key] !== null) {
        Object.assign(newProductInfo, data[key])
      }
    }
    try {
      await productsMng.updateProduct(pid, newProductInfo)
      res.sendSuccess()
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
  removeProduct = async (req, res) => {
    const { pid } = req.params
    try {
      await productsMng.deleteProduct(pid)
      res.sendSuccess()
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
}
