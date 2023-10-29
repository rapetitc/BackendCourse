import UsersModel from "./models/users.model.js";
import { evalUserInfo } from "../../utils/inputs.eval.js"

export default class UsersMng {
  constructor() {
    this.model = UsersModel
  }
  async exists(filter) {
    return await this.model.exists(filter) ? true : false
  }
  async createUser(userInfo) {
    const user = await evalUserInfo(userInfo)
    if (await this.exists({ email: user.email })) throw 'Already Exists'
    const { _id } = await this.model.create(user);
    return _id
  }
  async getUserById(uid) {
    if (! await this.exists({ _id: uid })) throw 'User Not Found'
    return await this.model.findById(uid)
  }
  async getUserByEmail(email) {
    if (! await this.exists({ email })) throw 'User Not Found'
    return await this.model.findOne({ email })
  }
  async updateUser(uid, newInfo) {
    if (! await this.exists({ _id: uid })) throw 'User Not Found'
    const data = await evalUserInfo(newInfo)
    await this.model.findByIdAndUpdate(uid, data)
  }
  async deleteUser(uid) {
    if (! await this.exists({ _id: uid })) throw 'User Not Found'
    await this.model.findByIdAndDelete(uid);
  }
}
