import passport from "passport";
import LocalStrategy from 'passport-local'
import JWTStrategy from 'passport-jwt'

import UserModel from "../services/models/user.model.js";
import { JWT_SECRET_KEY } from "./env.js";

const cookieExtractor = function (req) {
  return req && req.signedCookies ? req.signedCookies['sid'] : null;
};

const usePassportConfig = () => {
  // Local Strategy
  passport.use('local', new LocalStrategy({
    usernameField: 'email',
  }, async (username, password, done) => {
    try {
      const user = await UserModel.findOne({ email: username })

      if (!user) return done(null, false, { message: "User not found" })

      if (! await user.isValidPassword(password)) return done(null, false, { message: "Password is incorrect" })

      return done(null, user, { message: "Login success!" })
    } catch (error) {
      done(error)
    }
  }));

  passport.use('current', new JWTStrategy.Strategy({
    jwtFromRequest: JWTStrategy.ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: JWT_SECRET_KEY
  }, async (payload, done) => {
    try {
      const user = await UserModel.findOne({ email: payload.email })

      if (!user) throw ''
      
      const { first_name, last_name, age, cid, role, status } = user
      done(null, { first_name, last_name, age, cid: cid.toString(), role, status })
    } catch (error) {
      done(error)
    }

  }))

  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log(id);
    const user = await UserModel.findById(id)
    done(null, user);
  });
}

export default usePassportConfig