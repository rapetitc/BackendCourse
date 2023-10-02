import UserManager from "../services/managers/user.mng.js"

const userMng = new UserManager

class SessionsController {
  login = async (req, res) => {
    const { email, password } = req.body
    try {
      const resp = await userMng.validCredentials(email, password)
      req.session.user = resp
      res.status(200).send({
        status: 'success',
        payload: resp
      })
    } catch (error) {
      res.status(400).send({
        status: 'error',
        message: 'Error al intentar iniciar sesion'
      })
      console.log(error);
    }
  }
  logout = async (req, res) => {
    try {
      req.session.destroy()
      res.status(200).send({
        status: 'success'
      })
    } catch (error) {
      res.status(400).send({
        status: 'error',
        message: 'Error al intentar cerrar sesion'
      })
      console.log(error);
    }
  }
}

export default SessionsController