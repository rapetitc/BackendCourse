import UsersMng from "../services/users.mng.js"
// import { evalUserInfo } from "../utils/inputs.eval.js"

const usersMng = new UsersMng

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
  notfound = async (req, res) => {
    res.render('notfound')
  }
}
