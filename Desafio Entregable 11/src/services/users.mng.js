import UsersModel from "./models/users.model.js";

export default class UsersMng {
  constructor() {
    this.model = UsersModel
  }
  async exists(filter) {
    return await this.model.exists(filter) ? true : false
  }
  async createUser(user) {
    const { _id } = await this.model.create(user);
    return _id
  }
  async getUser(uid) {
    if (! await this.exists({ _id: uid })) throw 'User Not Found'
    return await this.model.findById(uid)
  }
  async updateUser(uid, newInfo) {
    if (! await this.exists({ _id: uid })) throw 'User Not Found'
    await this.model.findByIdAndUpdate(uid, newInfo)
  }
  async deleteUser(uid) {
    if (! await this.exists({ _id: uid })) throw 'User Not Found'
    await this.model.findByIdAndDelete(uid);
  }
}
