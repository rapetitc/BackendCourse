import jwt from "jsonwebtoken";

import UsersMng from "../dao/MongoDB/users.mng.js";
import UserDTO from "../dao/dto/user.dto.js";
import ErrorHandler from "../utils/ErrorsHandler.js";
import transporter from "../utils/email.transporter.js";
import { emailForRecoveryPassowrd } from "../utils/email.templates.js";
import { JWT_SECRET_KEY } from "../config/env.js";
import isValidPassword from "../utils/isValidPassword.js";

const usersMng = new UsersMng();

export default class UsersCtrlr {
  createUser = async (req, res, next) => {
    const { first_name, last_name, age, email, password } = req.body;
    try {
      const user = await usersMng.createUser(new UserDTO({ first_name, last_name, age, email, password }, "newToStore"));
      res.sendCreated({ msg: "User was successfully created", payload: new UserDTO(user, "response") });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req, res, next) => {
    const { uid } = req.params;
    try {
      const user = await usersMng.getUserById(uid);
      res.sendSuccess({ payload: new UserDTO(user, "response") });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    const { uid } = req.params;
    const profile_picture = req.file.path;
    const { first_name, last_name, age, email, cart, role, status } = req.body;
    try {
      const userUpdated = await usersMng.updateUser(uid === "this" ? req.user._id : uid, {
        first_name,
        last_name,
        age,
        email,
        cart,
        role,
        status,
        profile_picture,
      });
      res.sendSuccess({ msg: "User was successfully updated", payload: new UserDTO(userUpdated, "response") });
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (req, res, next) => {
    const { uid } = req.params;
    try {
      await usersMng.deleteUser(uid === "this" ? req.user._id : uid);
      res.sendSuccess({ msg: "User was succesfully removed" });
    } catch (error) {
      next(error);
    }
  };

  updateUserPremiumStatus = async (req, res) => {
    const { uid } = req.params;
    const requirements = { identification: "LEFT", address_certificate: "LEFT", bank_account_certificate: "LEFT" };
    try {
      const { documents, role } = await usersMng.getUserById(uid);
      if (documents.length === 0) ErrorHandler.create({ code: 6 });

      if (role === "USER") {
        const uncheckedDoc = {};
        documents.forEach((doc) => {
          if (doc.status !== "VALID") uncheckedDoc[doc.name] = doc.status;
        });
        if (uncheckedDoc.length > 0 || documents.length !== 3) ErrorHandler.create({ code: 6, cause: Object.assign(requirements, uncheckedDoc) });
      }

      await usersMng.updateUser(uid, { role: role === "USER" ? "PREMIUM" : "USER" });
      res.sendSuccess({ msg: "User was successfully updated" });
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
        html: await emailForRecoveryPassowrd(token.replaceAll(".", "<<dot>>")),
      });

      res.sendSuccess();
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
      next(error);
    }
  };

  recoveryPassword3rdStep = async (req, res, next) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    try {
      const { uid } = jwt.verify(token.replaceAll("<<dot>>", "."), JWT_SECRET_KEY);
      const { password } = await usersMng.getUserById(uid);
      if (await isValidPassword(newPassword, password)) throw new Error("Same current password");
      await usersMng.updateUser(uid, { password: newPassword });
      res.sendSuccess();
    } catch (error) {
      next(error);
    }
  };

  updateUserDocs = async (req, res, next) => {
    try {
      if (!req.files) ErrorHandler.create({ code: 5 });

      let files = { documents: [] };
      req.files.forEach((file) => {
        let newFile = {};
        newFile["name"] = file.filename;
        newFile["reference"] = file.path;
        files["documents"].push(newFile);
      });

      await usersMng.updateUserDocs(req.uid, files);
      res.sendSuccess({ msg: "Documents were uploaded successfully" });
    } catch (error) {
      next(error);
    }
  };
}
