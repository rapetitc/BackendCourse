import express from "express"
import ProductManager from "./ProductManager.js"

const PORT = 3030
const ProdMng = new ProductManager("./src/db.json")
const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.get("/", async (req, res) => {
  res.send('<h1>Bienvenidos a mi proyecto!</h1><br><a href="/products">Productos</a><br><a href="/products/1">Producto ID 1</a>')
})
app.get("/products", async (req, res) => {
  const { limit } = req.query
  let db = await ProdMng.getProducts()
  if (limit) db = db.slice(0, limit)
  res.send(db)
})
app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params
  const product = await ProdMng.getProductById(pid)
  res.send(product)
})

// Server
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}, http://localhost:${PORT}/`);
})