import fs from "fs"
const fsp = fs.promises

class ProductManager {
  constructor(path) {
    this.path = path ?? "./db.json"
    this.initialDBSetting = { nextId: 1, data: [] }
  }
  eval = {
    sht5: (value) => { // String Higher Than 5
      if (value.length < 5) throw `Error al agregar el valor ${value} al producto`
      return value
    },
    nht0: (value) => { // Number Higher Than 0
      if (value <= 0) throw `Error al agregarel valor numerico ${value} al producto`
      return value
    },
    existance: (value) => {
      if (!value) throw `Error al agregar valor inexistente ${value} al producto`
      return value
    },
    code: (value, db) => {
      const code = db.filter(prod => prod.code == value)
      if (value.length !== 12 || code.length > 0) throw "Error al agregar el codigo al producto"
      return value
    },
    aht0: (value) => {
      if (value.length <= 0) throw `Error al agregar la valor de tipo arreglo ${value} producto`
      return value
    }
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
  async getProductById(pid) {
    const { data } = await this.getDB()
    return data.find(product => product.id == pid)
  }
  async addProduct({ title, description, code, price, status, stock, category, thumbnails }) {
    const dbInfo = await this.getDB()
    const productInfo = {
      id: dbInfo.nextId++,
      title: this.eval["sht5"](title),
      description: this.eval["sht5"](description),
      code: this.eval["code"](code, dbInfo.data),
      price: this.eval["nht0"](price),
      status: this.eval["existance"](status),
      stock: this.eval["nht0"](stock),
      category: this.eval["existance"](category),
      thumbnails: this.eval["aht0"](thumbnails),
    }
    dbInfo.data.push(productInfo)
    await fsp.writeFile(this.path, JSON.stringify(dbInfo))
  }
  async updateProduct(pid, newInfo) {
    const dbInfo = await this.getDB()

    let prodInfo = dbInfo.data.find(product => product.id == pid)
    if (!prodInfo) throw "Prod/NotFound"

    prodInfo.title = newInfo.title ? this.eval["sht5"](newInfo.title) : prodInfo.title
    prodInfo.description = newInfo.description ? this.eval["sht5"](newInfo.description) : prodInfo.description
    prodInfo.code = newInfo.code ? this.eval["code"](newInfo.code, dbInfo.data) : prodInfo.code
    prodInfo.price = newInfo.price ? this.eval["nht0"](newInfo.price) : prodInfo.price
    prodInfo.status = newInfo.status ? this.eval["existance"](newInfo.status) : prodInfo.status
    prodInfo.stock = newInfo.stock ? this.eval["existance"](newInfo.stock) : prodInfo.stock
    prodInfo.categoty = newInfo.categoty ? this.eval["existance"](newInfo.categoty) : prodInfo.categoty
    prodInfo.thumbnails = newInfo.thumbnails ? this.eval["aht0"](newInfo.thumbnails) : prodInfo.thumbnails

    await fsp.writeFile(this.path, JSON.stringify(dbInfo))
  }
  async deleteProduct(prodID) {
    let dbInfo = await this.getDB()

    let prodInfo = dbInfo.data.find(product => product.id == prodID)
    if (!prodInfo) throw "Prod/NotFound"

    dbInfo.data = dbInfo.data.filter(product => product.id != prodID)
    await fsp.writeFile(this.path, JSON.stringify(dbInfo))
  }
}

export default ProductManager