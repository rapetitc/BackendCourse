// import { CartManager } from "../dao/dao.js"

// const cartMng = CartManager()

class ViewsController {
  index = async (req, res) => {
    res.render("index", {
      title: "Bienvenidos"
    })
  } 
  login = async (req, res) => {
    res.render("login", {
      title: "Iniciar Sesion"
    })
  }
  signup = async (req, res) => {
    res.render("signup", {
      title: "Registrarse"
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