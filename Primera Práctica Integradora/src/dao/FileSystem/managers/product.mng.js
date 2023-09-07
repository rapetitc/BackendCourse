import fs from "fs"
const fsp = fs.promises

class ProductManager {
  constructor(path) {
    this.path = path ?? "./src/dao/FileSystem/database/products.json"
    this.initialDBSetting = { nextId: 1, data: [] }
  }
  async checkDB() {
    if (!fs.existsSync(this.path)) await fsp.writeFile(this.path, JSON.stringify(this.initialDBSetting))
  }
  async getDB() {
    await this.checkDB()
    return JSON.parse(await fsp.readFile(this.path, "utf-8"))
  }
  async addProduct({ title, description, code, price, status, stock, category, thumbnails }) {
    const dbInfo = await this.getDB()
    const productInfo = { title, description, code, price, status, stock, category, thumbnails }
    dbInfo.data.push(productInfo)
    await fsp.writeFile(this.path, JSON.stringify(dbInfo))
  }
  async getProducts() {
    const { data } = await this.getDB()
    return data
  }
  async getProduct(pid) {
    const { data } = await this.getDB()
    return data.find(product => product.id == pid)
  }
  async updateProduct(pid, { title, description, code, price, status, stock, category, thumbnails }) {
    const dbInfo = await this.getDB()

    let prodInfo = dbInfo.data.find(product => product.id == pid)
    if (!prodInfo) throw "Prod/NotFound"

    prodInfo.title = title ? title : prodInfo.title
    prodInfo.description = description ? description : prodInfo.description
    prodInfo.code = code ? code : prodInfo.code
    prodInfo.price = price ? price : prodInfo.price
    prodInfo.status = status ? status : prodInfo.status
    prodInfo.stock = stock ? stock : prodInfo.stock
    prodInfo.category = category ? category : prodInfo.category
    prodInfo.thumbnails = thumbnails ? thumbnails : prodInfo.thumbnails

    await fsp.writeFile(this.path, JSON.stringify(dbInfo))
  }
  async removeProduct(pid) {
    const dbInfo = await this.getDB()

    let prodInfo = dbInfo.data.find(product => product.id == pid)
    if (!prodInfo) throw "Prod/NotFound"

    dbInfo.data = dbInfo.data.filter(product => product.id !== pid)
    await fsp.writeFile(this.path, JSON.stringify(dbInfo))
  }
}

export default ProductManager