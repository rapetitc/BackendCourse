import UsersMng from "../dao/MongoDB/users.mng.js";
import UserDTO from "../dto/user.dto.js";
import ErrorHandler from "../utils/errorsHandler.js";

const usersMng = new UsersMng();

export default class SessionsCtrlr {
  login = async (req, res, next) => {
    try {
      if (req.isAuthenticated()) {
        await usersMng.updateLastConnection();
        res.sendSuccess({ message: "Session was successfully initiated", payload: new UserDTO(req.user, "response") });
      } else {
        res.sendUnauthorized();
      }
    } catch (error) {
      next(error);
    }
  };
  github = async (req, res, next) => {
    // TODO Build
    try {
      if (req.isAuthenticated()) {
        await usersMng.updateLastConnection();
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
      if (!req.isAuthenticated()) ErrorHandler.create({ code: 2 });

      await usersMng.updateLastConnection();
      res.sendSuccess({ message: "Session still active", payload: new UserDTO(req.user, "response") });
    } catch (error) {
      next(error);
    }
  };
  logout = async (req, res, next) => {
    try {
      if (!req.isAuthenticated()) ErrorHandler.create({ code: 8 });

      await usersMng.updateLastConnection();
      req.logout((error) => {
        if (error) return next(error);
        res.sendSuccess({ message: "Session was successfully closed" });
      });
    } catch (error) {
      next(error);
    }
  };
}
