import UsersModel from "./models/users.model.js";
import ErrorHandler from "../../utils/errorsHandler.js";

export default class UsersMng {
  constructor() {
    this.model = UsersModel;
  }

  async exists(filter) {
    return (await this.model.exists(filter)) ? true : false;
  }

  async createUser(userInfo) {
    const user = new this.model(userInfo);
    await user.validate().catch((error) => {
      const keys = Object.keys(error.errors);
      const cause = {};
      keys.forEach((key) => {
        cause[key] = error.errors[key].kind;
      });
      ErrorHandler.create({ code: 4, cause });
    });
    if (await this.exists({ email: user.email })) ErrorHandler.create({ code: 3 });
    return await user.save();
  }

  async getUserById(uid) {
    const user = await this.model.findById(uid);
    if (!user) ErrorHandler.create({ code: 2 });
    return user;
  }

  async getUserByEmail(email) {
    const user = await this.model.findOne({ email });
    if (!user) ErrorHandler.create({ code: 2 });
    return user;
  }

  async updateUser(uid, newUserInfo) {
    for (const key in newUserInfo) {
      if (newUserInfo[key] === undefined) delete newUserInfo[key];
    }
    if (Object.keys(newUserInfo).length == 0) ErrorHandler.create({ code: 4 });
    const user = await this.model.findOneAndUpdate({ _id: uid }, { $set: newUserInfo }, { new: true, runValidators: true }).catch((error) => {
      const cause = {};
      if (error.errors) {
        const keys = Object.keys(error.errors);
        keys.forEach((key) => {
          cause[key] = error.errors[key].kind;
        });
      } else {
        cause[error.path] = error.kind;
      }
      ErrorHandler.create({ code: 4, cause });
    });
    if (!user) ErrorHandler.create({ code: 2 });
    return user;
  }

  async deleteUser(uid) {
    if (!(await this.exists({ _id: uid }))) ErrorHandler.create({ code: 2 });
    await this.model.findByIdAndDelete(uid);
  }

  async updateUserPremiumStatus(uid) {
    const requirements = ["identification", "address_certificate", "bank_account_certificate"];
    const { role, documents } = await this.getUserById(uid);
    const uncheckedDoc = {};
    if (role !== "PREMIUM") {
      if (documents.length === 0)
        requirements.forEach((req) => {
          if (!documents[req]) uncheckedDoc[req] = "LEFT";
          else if (documents[req].status !== "VALID") uncheckedDoc[req] = doc.status;
        });
    }
    Object.entries(uncheckedDoc).length > 0 && ErrorHandler.create({ code: 7, cause: uncheckedDoc });
    await this.updateUser(uid, { role: role === "USER" ? "PREMIUM" : "USER" });
  }

  async updateUserDocs(uid, files) {
    const user = await this.model.findOneAndUpdate({ _id: uid }, { $push: files }, { new: true, runValidators: true }).catch((error) => {
      const cause = {};
      if (error.errors) {
        const keys = Object.keys(error.errors);
        keys.forEach((key) => {
          cause[key] = error.errors[key].kind;
        });
      } else {
        cause[error.path] = error.kind;
      }
      ErrorHandler.create({ code: 0, cause });
    });
    if (!user) ErrorHandler.create({ code: 2 });
  }

  async updateLastConnection(uid) {
    await this.model.findOneAndUpdate({ _id: uid }, { $set: { last_connection: Date.now() } }, { new: true, runValidators: true }).catch((error) => {
      const cause = {};
      if (error.errors) {
        const keys = Object.keys(error.errors);
        keys.forEach((key) => {
          cause[key] = error.errors[key].kind;
        });
      } else {
        cause[error.path] = error.kind;
      }
      ErrorHandler.create({ code: 1, cause });
    });
  }
}
