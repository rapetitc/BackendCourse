import fs from "fs"
const fsp = fs.promises

// TODO Refactor 
export default class ProductsMng {
  constructor(path) {
    this.path = path ?? "./src/services/FileSystem/storages/products.db.json"
    this.initialDBSetting = { nextId: 1, data: [] }
  }
  async checkDB() {
    if (!fs.existsSync(this.path)) await fsp.writeFile(this.path, JSON.stringify(this.initialDBSetting))
  }
  async getDB() {
    await this.checkDB()
    return JSON.parse(await fsp.readFile(this.path, "utf-8"))
  }
  async getProducts() {
    const { data } = await this.getDB()
    return data
  }
  async getProduct(pid) {
    const { data } = await this.getDB()
    return data.find(product => product.id == pid)
  }
  async createProduct({ title, description, code, price, status, stock, category, thumbnails }) {
    const dbInfo = await this.getDB()
    const productInfo = { _id: dbInfo.nextId++, title, description, code, price, status, stock, category, thumbnails }
    dbInfo.data.push(productInfo)
    await fsp.writeFile(this.path, JSON.stringify(dbInfo))
  }
  async updateProduct(pid, newInfo) {
    const dbInfo = await this.getDB()

    let product = dbInfo.data.find(product => product._id == pid)
    if (!product) throw "Product Not Found"

    const keys = Object.keys(newInfo)
    for (const key of keys) {
      product[key] = newInfo[key]
    }
    await fsp.writeFile(this.path, JSON.stringify(dbInfo))
  }
  async deleteProduct(prodID) {
    const dbInfo = await this.getDB()

    let prodInfo = dbInfo.data.find(product => product.id == prodID)
    if (!prodInfo) throw "Prod/NotFound"

    dbInfo.data = dbInfo.data.filter(product => product.id !== prodID)
    await fsp.writeFile(this.path, JSON.stringify(dbInfo))
  }
}