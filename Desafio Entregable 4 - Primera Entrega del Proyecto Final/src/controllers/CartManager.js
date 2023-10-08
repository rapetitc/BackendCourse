import fs from "fs"
const fsp = fs.promises
import ProductManager from "./ProductManager.js";

const ProdMng = new ProductManager("./src/db/products.json")

class CartManager {
  constructor(path) {
    this.path = path ?? "./db.json"
    this.initialDBSetting = { nextId: 1, data: [] }
  }
  async checkDB() {
    if (!fs.existsSync(this.path)) await fsp.writeFile(this.path, JSON.stringify(this.initialDBSetting))
  }
  async getDB() {
    await this.checkDB()
    return JSON.parse(await fsp.readFile(this.path, "utf-8"))
  }
  async addCart() {
    const dbInfo = await this.getDB()
    const cartinfo = {
      id: dbInfo.nextId++,
      storage: []
    }
    dbInfo.data.push(cartinfo)

    await fsp.writeFile(this.path, JSON.stringify(dbInfo))
    return cartinfo.id
  }
  async getCartById(id) {
    const { data } = await this.getDB()
    return data.find(cart => cart.id == id)
  }
  async addProductToCart(cid, pid, quantity) {
    const dbInfo = await this.getDB()

    if (isNaN(quantity)) quantity = 1

    const cartInfo = dbInfo.data.find(cart => cart.id == cid)
    if (!cartInfo) throw "Cart/NotFound"

    const prodInfo = await ProdMng.getProductById(pid)
    if (!prodInfo) throw "Prod/NotFound"

    const prod = cartInfo.storage.find(prod => prod.pid == pid)
    if (prod) {
      prod.quantity += quantity
    } else {
      cartInfo.storage.push({
        pid,
        quantity: quantity
      })
    }
    await fsp.writeFile(this.path, JSON.stringify(dbInfo))
  }
  async deleteProductFromCart(cid, pid) {
    const dbInfo = await this.getDB()

    const cartInfo = dbInfo.data.find(cart => cart.id == cid)
    if (!cartInfo) throw "Cart/NotFound"

    cartInfo.storage = cartInfo.storage.filter(prod => prod.pid != pid)

    await fsp.writeFile(this.path, JSON.stringify(dbInfo))
  }
}

export default CartManager