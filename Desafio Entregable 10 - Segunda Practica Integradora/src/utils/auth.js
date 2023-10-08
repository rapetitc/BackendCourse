import jwt from 'jsonwebtoken'

import { JWT_SECRET_KEY } from '../config/env.js'
import UserManager from '../services/managers/user.mng.js'

const UserMng = new UserManager

const extractToken = async (req) => {
  const { sid } = req.signedCookies
  const { email } = sid ? jwt.verify(sid, JWT_SECRET_KEY) : {}
  const user = email ? await UserMng.getUserByEmail(email) : null
  const { first_name, last_name, age, cid, role, status } = user ? user : {}
  req.user = user ? { first_name, last_name, email, age, cid: cid.toString(), role, status } : null
}

export const auth = (options) => {
  const { authRoles = [], authGuestUsers = true, authLoggedUsers = true } = options ?? {}

  return async (req, res, next) => {
    // await extractToken(req)

    //Unlogged
    if (!authGuestUsers && !req.user) return res.redirect('/login')

    //Logged
    if (!authLoggedUsers && req.user) return res.redirect('/')

    return next()
  }
}