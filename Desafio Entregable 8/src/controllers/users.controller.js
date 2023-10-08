import UserManager from "../services/managers/user.mng.js";
import { evalUserInfo } from "../utils/userinfo.eval.js";

const usersMng = new UserManager

class UsersController {
  createUser = async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body
    const formData = { first_name, last_name, age, email, password }
    try {
      await usersMng.createUser(await evalUserInfo(formData))
      res.status(201).send({
        status: 'success',
      })
    } catch (error) {
      if (error.message == 'User Info Format is Invalid.') return res.status(400).send({
        status: 'error',
        cause: error.cause
      })
      res.status(400).send({
        status: 'error',
        message: 'Error al intentar crear un usuario'
      })
      console.log(error);
    }
  }
}

export default UsersController