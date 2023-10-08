import userModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../../utils/password.validator.js"

class UserManager {
  async createUser(user) {
    user.password = createHash(user.password);
    return await userModel.create(user);
  }
  async emailExists(email) {
    const resp = await userModel.exists({ email })
    return resp == null ? false : true
  }
  async validCredentials(email, password) {
    const resp = await userModel.findOne({ email })
    if (resp == null) throw 'UserNotFound'
    if (!isValidPassword(password, resp.password)) throw 'IncorrectPassword'
    const { first_name, last_name, age } = resp
    return { first_name, last_name, age, email }
  }
}

export default UserManager