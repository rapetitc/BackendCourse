import passport from "passport";
import Local from 'passport-local'
import UsersModel from "../services/MongoDB/models/users.model.js";
// import JWT from "jsonwebtoken";
// import { JWT_SECRET_KEY } from "./env.js";

export default function usePassport() {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (uid, done) {
    try {
      const user = await UsersModel.findById(uid)
      done(null, user);
    } catch (error) {
      done(error)
    }
  });

  passport.use('local', new Local.Strategy(async function (username, password, done) {
    try {
      const user = await UsersModel.findOne({ email: username });
      if (!user) { return done(null, false, 'User Not Found'); }
      if (!user.isValidPassword(password)) { return done(null, false, "Incorrect Password"); }
      return done(null, user);
    } catch (error) {
      done(error)
    }
  }
  ));
}