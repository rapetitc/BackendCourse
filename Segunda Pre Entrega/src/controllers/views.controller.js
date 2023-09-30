import { CartManager } from "../dao/dao.js"

const cartMng = CartManager()

class ViewsController {
  index = async (req, res) => {
    res.render("index", {
      title: "Bienvenidos"
    })
  }
  products = async (req, res) => {
    res.render("products", {
      title: "Productos"
    })
  }
  carts = async (req, res) => {
    res.render("carts", {
      title: "Carrito de compras",
    })
  }
  notFound = async (req, res) => {
    res.render("notFound", {
      title: "¡Pagina no encontrada!"
    })
  }
}

export default ViewsController