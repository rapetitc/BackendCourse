import userModel from "../models/userModel.js";
import { isValidPassword } from '../utils/functionsUtil.js';

class SessionManager {

  async login({ email, password }) {
    try {
      const user = await userModel.findOne({ email: email });
      if (!user && isValidPassword(password, user.password)) {
        return user;
      }
      throw 'Login failed';
    } catch (error) {
      console.log(error);
    }
  }

}

export default SessionManager;