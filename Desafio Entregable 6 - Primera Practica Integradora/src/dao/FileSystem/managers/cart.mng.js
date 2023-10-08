import fs from "fs"
const fsp = fs.promises
import ProductManager from "./product.mng.js"

const ProdMng = new ProductManager

class CartManager {
  constructor(path) {
    this.path = path ?? "./src/dao/FileSystem/database/carts.json"
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
  async getCart(cid) {
    const { data } = await this.getDB()
    return data.find(cart => cart.id == cid)
  }
  async updateCart(cid, pid, quantity) {
    const dbInfo = await this.getDB()

    if (isNaN(quantity)) quantity = 1

    const cart = dbInfo.data.find(cart => cart.id == cid)
    if (!cart) throw "Cart not found!"

    const prodInfo = await ProdMng.getProductById(pid)
    if (!prodInfo) throw "Product not found!"

    const prod = cart.storage.find(prod => prod.pid == pid)
    if (prod) {
      if (quantity < 1) prod.quantity = quantity
      else cart.storage = cart.storage.filter((prod) => prod.pid != pid)
    } else {
      cart.storage.push({
        pid: pid,
        quantity: quantity
      })
    }
    await fsp.writeFile(this.path, JSON.stringify(dbInfo))
  }
  async removeCart(cid) {
    const dbInfo = await this.getDB()

    const cartInfo = dbInfo.data.find(cart => cart.id == cid)
    if (!cartInfo) throw "Cart not found!"

    cartInfo = cartInfo.filter(cart => cart.id != cid)

    await fsp.writeFile(this.path, JSON.stringify(dbInfo))
  }
}

export default CartManager