// Desafio Entregable 2 - Clases ECMAScript y ECMAScript avanzado

class ProductManager {
  constructor() {
    this.id = 0
    this.products = []
  }
  addProduct(title, description, price, thumbnail, code, stock) {
    const product = {
      id: ++this.id,
      title: (() => { if (!title || title.length < 3) { throw "Error al agregar el titulo al producto" } return title })(),
      description: (() => { if (!description || description.length < 5) { throw "Error al agregar la descripcion al producto" } return description })(),
      price: (() => { if (!price || price < 1) { throw "Error al agregar el precio al producto" } return price })(),
      thumbnail: (() => { if (!thumbnail || thumbnail.length < 1) { throw "Error al agregar las rutas de las imagenes" } return thumbnail })(),
      code: (() => { if (!code || this.products.includes((prod) => prod.code == code)) { throw "Error al agregar codigo al producto" } return code })(),
      stock: (() => { if (!stock || stock < 1) { throw "Error al agregar la disponibilidad del producto" } return stock })()
    }

    this.products.push(product)
  }
  getProducts = () => this.products
  getProductById = (productID) => this.products.find(product => product.id == productID) ?? {}
}

// ↓↓↓↓↓ TEST THE CODE ↓↓↓↓↓

const prodMng = new ProductManager

// Adding products
prodMng.addProduct("Samsung A71", "Telefono Inteligente de mediana gama", "600", ["ImgURL"], "92Q6WE8F1AQ9", "1")

// Printing products
console.log(prodMng.getProducts());

// Printing product found by ID
console.log(prodMng.getProductById(1));