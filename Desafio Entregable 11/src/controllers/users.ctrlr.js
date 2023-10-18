import UsersMng from "../services/MongoDB/users.mng.js"
import { evalUserInfo } from "../utils/inputs.eval.js"

const usersMng = new UsersMng

export default class UsersCtrlr {
  createUser = async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body
    try {
      const userInfo = await evalUserInfo({ first_name, last_name, age, email, password })
      res.sendCreated({ payload: await usersMng.createUser(userInfo) })
    } catch (error) {
      console.log(error);
      const reasons = [...error.cause]
      if (error = "Invalid Format") return res.sendBadRequest({
        causes: reasons
      })
      res.sendServerError()
    }
  }
  getUser = async (req, res) => {
    const { uid } = req.params
    try {
      const user = await usersMng.getUser(uid)
      user.password = undefined
      res.sendSuccess({
        payload: user
      })
    } catch (error) {
      console.log(error);
      if (error == "User Not Found") return res.sendBadRequest()
      res.sendServerError()
    }
  }
  updateUser = async (req, res) => { //TODO Improve
    const { uid } = req.params
    const { first_name, last_name, age, email, password, cart, role, status } = req.body
    const body = { first_name, last_name, age, email, password }
    const data = {}
    for (const key in body) {
      if (body[key]) data[key] = body[key]
    }
    try {
      const newInfo = await evalUserInfo(data)
      await usersMng.updateUser(uid, newInfo)
      res.sendSuccess({})
    } catch (error) {
      console.log(error);
      const reasons = [...error.cause]
      if (error = "Invalid Format") {
        return res.sendBadRequest({
          causes: reasons
        })
      }
      res.sendServerError()
    }
  }
  deleteUser = async (req, res) => {
    const { uid } = req.params
    try {
      await usersMng.deleteUser(uid)
      res.sendSuccess({})
    } catch (error) {
      console.log(error);
      res.sendServerError()
    }
  }
}
