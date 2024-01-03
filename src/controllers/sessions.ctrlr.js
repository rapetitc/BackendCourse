import passport from "passport";
import UsersMng from "../dao/MongoDB/users.mng.js";
import UserDTO from "../dto/user.dto.js";
import ErrorHandler from "../utils/errorsHandler.js";

const usersMng = new UsersMng();

export default class SessionsCtrlr {
  login = async (req, res, next) => {
    passport.authenticate("local", async function (err, user, info, status) {
      if (err) return next(err);
      if (!user) return res.sendIncorrectCredentials();

      req.login(user, (error) => {});
      await usersMng.updateLastConnection(req._id);
      res.sendSuccess({ message: "Session was successfully initiated", payload: new UserDTO(user, "response") });
    })(req, res, next);
  };
  github = async (req, res, next) => {
    try {
      if (req.isAuthenticated()) {
        await usersMng.updateLastConnection(req._id);
        res.sendSuccess({ message: "Session was successfully initiated", payload: new UserDTO(req.user, "response") });
      } else {
        res.sendUnauthorized();
      }
    } catch (error) {
      next(error);
    }
  };
  current = async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) ErrorHandler.create({ code: 8 });

      await usersMng.updateLastConnection(req._id);
      res.sendSuccess({ message: "Session still active", payload: new UserDTO(req.user, "response") });
    } catch (error) {
      next(error);
    }
  };
  logout = async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) ErrorHandler.create({ code: 8 });

      await usersMng.updateLastConnection(req._id);
      req.logout((error) => {
        if (error) return next(error);
        res.sendSuccess({ message: "Session was successfully closed" });
      });
    } catch (error) {
      next(error);
    }
  };
}
