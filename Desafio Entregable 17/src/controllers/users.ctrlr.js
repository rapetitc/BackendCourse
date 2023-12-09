import jwt from 'jsonwebtoken'

import UsersMng from "../dao/MongoDB/users.mng.js"
import transporter from "../utils/email.transporter.js"
import { emailForRecoveryPassowrd } from "../utils/email.templates.js"
import { JWT_SECRET_KEY } from '../config/env.js'
import isValidPassword from '../utils/isValidPassword.js'

const usersMng = new UsersMng

export default class UsersCtrlr {
  createUser = async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body
    try {
      await usersMng.createUser({ first_name, last_name, age, email, password })
      res.sendCreated({ msg: "User was successfully created" })
    } catch (error) {
      if (error.message == 'Already Exists') return res.sendBadRequest({ msg: "Invalid user info format", causes: [{ email: "Already exists" }] })
      if (error.message == 'Invalid User Info Format') return res.sendBadRequest({ msg: "Invalid user info format", causes: [...error.cause] })

      console.log(error);
      res.sendServerError()
    }
  }
  getUser = async (req, res) => {
    const { uid } = req.params
    try {
      const user = await usersMng.getUserById(uid)
      user.password = undefined
      user.updatedAt = undefined
      user.__v = undefined
      res.sendSuccess({ payload: user })
    } catch (error) {
      if (error == "User Not Found") return res.sendNotFound({ msg: "User not found" })
      res.sendServerError()
    }
  }
  updateUser = async (req, res) => {
    const { uid } = req.params
    const { first_name, last_name, age, email, password, cart, role, status } = req.body
    const data = { first_name, last_name, age, email, password, cart, role, status }
    let newUserInfo = {}
    for (const key in data) {
      if (data[key] !== undefined) {
        Object.assign(newUserInfo, JSON.parse(`{"${key}":${typeof data[key] == 'string' ? '"' + data[key] + '"' : data[key]}}`))
      }
    }
    try {
      if (Object.keys(newUserInfo).length == 0) throw "Not Info To Update"
      await usersMng.updateUser(uid === "this" ? req.user._id : uid, newUserInfo) // Do not send undefined or null data type
      res.sendSuccess({ msg: "User was successfully updated" })
    } catch (error) {
      if (error == 'User Not Found') return res.sendNotFound({ msg: "User not found" })
      if (error == "Not Info To Update") return res.sendBadRequest({ msg: "There is not new info to update" })
      if (error.message == "Invalid User Info Format") return res.sendBadRequest({ msg: "Invalid user info format", causes: [...error.cause] })

      console.log(error);
      res.sendServerError()
    }
  }
  updateUserPremiumStatus = async (req, res) => {
    const { uid } = req.params
    try {
      const { role } = await usersMng.getUserById(uid)
      await usersMng.updateUser(uid, { role: role === 'USER' ? 'PREMIUM' : 'USER' })
      res.sendSuccess({ msg: "User was successfully updated" })
    } catch (error) {
      if (error == 'User Not Found') return res.sendNotFound({ msg: "User not found" })
      if (error == "Not Info To Update") return res.sendBadRequest({ msg: "There is not new info to update" })

      console.log(error);
      res.sendServerError()
    }
  }
  deleteUser = async (req, res) => {
    const { uid } = req.params
    try {
      await usersMng.deleteUser(uid)
      res.sendSuccess({ msg: "User was succesfully removed" })
    } catch (error) {
      if (error == 'User Not Found') return res.sendNotFound({ msg: "User not found" })

      console.log(error);
      res.sendServerError()
    }
  }
  recoveryPassword1stStep = async (req, res) => {
    const { email } = req.body
    try {
      const { _id } = await usersMng.getUserByEmail(email)
      const token = jwt.sign({ uid: _id }, JWT_SECRET_KEY, { expiresIn: '1H' })

      transporter.sendMail({
        from: 'eCommerce App <rapetitc@gmail.com>',
        to: email,
        subject: "Reestablecer contraseña",
        html: await emailForRecoveryPassowrd(token.replaceAll('.', '<<dot>>'))
      })

      res.sendSuccess()
    } catch (error) {
      if (error.message == "User Not Found") return res.sendNotFound({ message: "User not found" })

      console.log(error);
      res.sendServerError()
    }
  }
  recoveryPassword2ndStep = async (req, res) => {
    const { token } = req.params
    try {
      const { uid } = jwt.verify(token.replaceAll('<<dot>>', '.'), JWT_SECRET_KEY)
      const renewedToken = jwt.sign({ uid }, JWT_SECRET_KEY, { expiresIn: '180s' })
      res.redirect(`/recovery-password/${renewedToken.replaceAll('.', '<<dot>>')}`)
    } catch (error) {
      if (error.message == 'jwt expired') return res.redirect('/recovery-password')

      console.log(error);
      res.sendServerError()
    }
  }
  recoveryPassword3rdStep = async (req, res) => {
    const { token } = req.params
    const { newPassword } = req.body
    try {
      const { uid } = jwt.verify(token.replaceAll('<<dot>>', '.'), JWT_SECRET_KEY)
      const { password } = await usersMng.getUserById(uid)
      if (await isValidPassword(newPassword, password)) throw new Error('Same current password')
      await usersMng.updateUser(uid, { password: newPassword })
      res.sendSuccess()
    } catch (error) {
      if (error.message == 'jwt expired') return res.sendBadRequest({ message: 'Token expired' })
      if (error.message == 'Same current password') return res.sendBadRequest({ message: 'Same current password' })

      console.log(error);
      res.sendServerError()
    }
  }
}