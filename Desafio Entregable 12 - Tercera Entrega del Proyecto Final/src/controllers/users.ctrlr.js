import UsersMng from "../dao/MongoDB/users.mng.js"

const usersMng = new UsersMng

export default class UsersCtrlr {
  createUser = async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body
    try {
      await usersMng.createUser({ first_name, last_name, age, email, password })
      res.sendCreated({ msg: "User was successfully created" })
    } catch (error) {
      if (error == 'Already Exists') return res.sendBadRequest({ msg: "Invalid user info format", causes: [{ email: "Already exists" }] })

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

      console.log(error);
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
      await usersMng.updateUser(uid, newUserInfo) // Do not send undefined or null data type
      res.sendSuccess({ msg: "User was successfully updated" })
    } catch (error) {
      if (error == 'User Not Found') return res.sendNotFound({ msg: "User not found" })
      if (error == "Not Info To Update") return res.sendBadRequest({ msg: "There is not new info to update" })
      if (error.message == "Invalid User Info Format") return res.sendBadRequest({ msg: "Invalid user info format", causes: [...error.cause] })

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
}