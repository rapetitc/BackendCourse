import ProductsMng from '../services/MongoDB/products.mng.js'
import CartsMng from '../services/MongoDB/carts.mng.js'

const productsMng = new ProductsMng
const cartsMng = new CartsMng

export default class ViewsCtrlr {
  index = async (req, res) => {
    const { first_name } = req.user ?? false
    res.render('index', {
      user: req.user ? { first_name } : false
    })
  }
  signup = async (req, res) => {
    res.render('signup', {
      title: "Registrarse",
    })
  }
  login = async (req, res) => {
    res.render('login', {
      title: "Iniciar Sesion",
    })
  }
  profile = async (req, res) => {
    const { first_name, last_name } = req.user ?? false
    res.render('profile', {
      title: "Pefil",
      user: req.user ? { first_name, last_name } : false
    })
  }
  sell = async (req, res) => {
    const { first_name } = req.user ?? false
    res.render('sell', {
      title: "Vender",
      user: req.user ? { first_name } : false
    })
  }
  product = async (req, res) => {
    const { pid } = req.params
    const { title, description, price, stock, category, thumbnails } = await productsMng.getProduct(pid)
    const { first_name } = req.user ?? false
    res.render('product', {
      title,
      user: req.user ? { first_name } : false,
      product: { title, description, price, stock, category, thumbnails }
    })
  }
  cart = async (req, res) => {
    const { cart, first_name } = req.user ?? false
    const { storage } = cart ? await cartsMng.getCompleteCart(cart).lean() : false
    res.render('cart', {
      title: "Carrito de compras",
      user: req.user ? { first_name } : false,
      storage: storage ?? []
    })
  }
  notfound = async (req, res) => {
    res.render('notfound')
  }
  working = async (req, res) => {
    res.render('working')
  }
}