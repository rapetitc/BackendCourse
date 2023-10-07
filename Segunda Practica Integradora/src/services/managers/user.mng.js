import UserModel from "../models/user.model.js";

class UserManager {
  async createUser(user) {
    return await UserModel.create(user);
  }
  async getUserByEmail(email) {
    return await UserModel.findOne({ email });
  }
  async userExists(email) {
    const resp = await UserModel.exists({ email })
    return resp == null ? false : true
  }
}

export default UserManager