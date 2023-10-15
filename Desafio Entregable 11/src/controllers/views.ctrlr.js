import UsersMng from "../services/users.mng.js"
import { evalUserInfo } from "../utils/inputs.eval.js"

const usersMng = new UsersMng

export default class ViewsCtrlr {
  index = async (req, res) => {
    const { first_name } = req.user ?? false
    res.render('index', {
      user: req.user ? { first_name } : false
    })
  }
  signup = async (req, res) => {
    res.render('signup')
  }
  login = async (req, res) => {
    res.render('login')
  }
  profile = async (req, res) => {
    const { first_name } = req.user ?? false
    res.render('profile', {
      user: req.user ? { first_name } : false
    })
  }
}
