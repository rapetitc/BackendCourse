import ProductManager from "../models/product.model.js"

const PMng = new ProductManager("./src/db/db.json")

class ViewsCtlr {
  async home(req, res) {
    const products = await PMng.getProducts()
    res.render("home", { products })
  }
  async realtime(req, res) {
    res.render("realTimeProducts")
  }
}

export default ViewsCtlr