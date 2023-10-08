class ViewsController {
  index = async (req, res) => {
    res.render("index", {
      title: "Bienvenidos",
      user: req.user ?? false
    })
  }
  signup = async (req, res) => {
    res.render("signup", {
      title: "Registrarse"
    })
  }
  login = async (req, res) => {
    res.render("login", {
      title: "Iniciar Sesion"
    })
  }
  profile = async (req, res) => {
    res.render("profile", {
      title: "Perfil",
      user: req.user ?? false
    })
  }
  products = async (req, res) => {
    res.render("products", {
      title: "Productos",
      user: req.user ?? false
    })
  }
  carts = async (req, res) => {
    const { cid } = req.params
    res.render("carts", {
      title: "Carrito de compras",
      user: req.user ?? false,
      cid
    })
  }
  notFound = async (req, res) => {
    res.render("notFound", {
      title: "¡Pagina no encontrada!"
    })
  }
}

export default ViewsController