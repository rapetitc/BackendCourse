import jwt from 'jsonwebtoken'

import UserManager from "../services/managers/user.mng.js"
import { JWT_SECRET_KEY } from '../config/env.js';

const userMng = new UserManager

class SessionsController {
  login = async (req, res) => {
    const { email } = req.user
    res.status(200).cookie('sid', jwt.sign({ email }, JWT_SECRET_KEY, { expiresIn: "7d" }), { maxAge: 1000 * 60 * 60 * 24 * 7, signed: true }).send({
      status: "success",
      message: "Sesion iniciada satisfactoriamente"
    })
  }
  current = async (req, res) => {
    res.send({
      status: "succes",
      payload: req.user
    })
  }
  logout = async (req, res) => {
    try {
      res.status(200).clearCookie('sid').redirect('/')
    } catch (error) {
      console.log(error);
      res.status(400).send({
        status: 'error',
        message: 'Error al intentar cerrar sesion'
      })
    }
  }
}

export default SessionsController