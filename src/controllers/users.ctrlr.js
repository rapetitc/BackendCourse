import jwt from "jsonwebtoken";

import UsersMng from "../dao/MongoDB/users.mng.js";
import UserDTO from "../dto/user.dto.js";
import ErrorHandler from "../utils/errorsHandler.js";
import transporter from "../utils/email.transporter.js";
import { recoveryPassowrdTemplate } from "../utils/email.transporter.js";
import { JWT_SECRET_KEY } from "../config/env.js";

const usersMng = new UsersMng();

export default class UsersCtrlr {
  createUser = async (req, res, next) => {
    const { first_name, last_name, age, email, password } = req.body;
    try {
      const user = await usersMng.createUser({ first_name, last_name, age, email, password });
      res.sendCreated({ message: "User successfully created", payload: new UserDTO(user, "response") });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req, res, next) => {
    const { uid } = req.params;
    try {
      const user = await usersMng.getUserById(uid);
      res.sendSuccess({ message: "User found", payload: new UserDTO(user, "response") });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    const uid = req.params.uid === "this" ? req.user._id : req.params.uid;
    const profile_picture = req.file?.path;
    const { first_name, last_name, age, email, cart, status } = req.body;
    const data = { first_name, last_name, age, email, cart, status, profile_picture };
    try {
      if (!(req.user.role === "ADMIN" || uid === req.user._id)) ErrorHandler.create({ code: 1 });
      const userUpdated = await usersMng.updateUser(uid, data);
      res.sendSuccess({ message: "User was successfully updated", payload: new UserDTO(userUpdated, "response") });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    const uid = req.params.uid === "this" ? req.user._id : req.params.uid;
    try {
      if (!(req.user.role === "ADMIN" || uid === req.user._id)) ErrorHandler.create({ code: 1 });
      await usersMng.deleteUser(uid);
      res.sendSuccess({ message: "User was succesfully removed" });
    } catch (error) {
      next(error);
    }
  };

  updateUserPremiumStatus = async (req, res, next) => {
    const uid = req.params.uid === "this" ? req.user._id : req.params.uid;
    try {
      await usersMng.updateUserPremiumStatus(uid);
      res.sendSuccess({ message: "User was successfully updated" });
    } catch (error) {
      next(error);
    }
  };

  recoveryPassword1stStep = async (req, res, next) => {
    const { email } = req.body;
    try {
      const { _id } = await usersMng.getUserByEmail(email);
      const token = jwt.sign({ uid: _id }, JWT_SECRET_KEY, { expiresIn: "1H" });

      transporter.sendMail({
        from: "eCommerce App <rapetitc@gmail.com>",
        to: email,
        subject: "Reestablecer contraseña",
        html: await recoveryPassowrdTemplate(token.replaceAll(".", "<<dot>>")),
      });

      res.sendSuccess({ message: "Recovery request successfully initiated" });
    } catch (error) {
      next(error);
    }
  };

  recoveryPassword2ndStep = async (req, res, next) => {
    const { token } = req.params;
    try {
      const { uid } = jwt.verify(token.replaceAll("<<dot>>", "."), JWT_SECRET_KEY);
      const renewedToken = jwt.sign({ uid }, JWT_SECRET_KEY, { expiresIn: "180s" });
      res.redirect(`/recovery-password/${renewedToken.replaceAll(".", "<<dot>>")}`);
    } catch (error) {
      if (error.message === "jwt malformed") return res.redirect("/recovery-password/");
      next(error);
    }
  };

  recoveryPassword3rdStep = async (req, res, next) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
      const { uid } = jwt.verify(token.replaceAll("<<dot>>", "."), JWT_SECRET_KEY);
      const user = await usersMng.getUserById(uid);
      if (await isValidPassword(newPassword, user.password)) ErrorHandler.create({ code: 9 });
      await usersMng.updateUser(uid, { password: password });
      res.sendSuccess({ message: "User's password successfully updated" });
    } catch (error) {
      next(error);
    }
  };

  updateUserDocs = async (req, res, next) => {
    try {
      if (!req.files) ErrorHandler.create({ code: 6 });

      const files = { documents: [] };
      req.files.forEach((file) => {
        files.documents.push({ name: file.filename, reference: file.path });
      });

      await usersMng.updateUserDocs(req.uid, files);
      res.sendSuccess({ msg: "Documents were uploaded successfully" });
    } catch (error) {
      next(error);
    }
  };
}
