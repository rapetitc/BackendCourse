import UserManager from "../services/managers/user.mng.js";
import { evalUserInfo } from "../utils/inputs.eval.js";

const usersMng = new UserManager

class UsersController {
  createUser = async (req, res) => {
    const { first_name, last_name, age, email, password } = req.body
    try {
      const userInfo = evalUserInfo({ first_name, last_name, age, email, password })
      if (await usersMng.userExists(userInfo.email)) throw new Error("Email is already associated with an existing account.", { cause: [{ Email: "Corre electronico ya existe." }] })
      await usersMng.createUser(userInfo)
      res.status(201).send({
        status: 'success',
        message: 'Usuario creado satisfactoriamente.',
      })
    } catch (error) {
      if (error.message == 'User Info Format is invalid.') return res.status(406).send({
        status: 'error',
        message: 'Formato invalido.',
        cause: error.cause
      })
      if (error.message == "Email is already associated with an existing account.") return res.status(400).send({
        status: 'error',
        message: "Correo electronico asociado con una cuenta activa.",
        cause: error.cause
      })
      res.status(400).send({
        status: 'error',
        message: 'Error al intentar crear usuario.'
      })
    }
  }
}

export default UsersController