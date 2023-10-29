import Local from 'passport-local'
import UsersMng from '../dao/MongoDB/users.mng.js'
// import JWT from "jsonwebtoken";
// import { JWT_SECRET_KEY } from "./env.js";

const userMng = new UsersMng

export default function usePassport(passport) {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (uid, done) {
    try {
      done(null, await userMng.getUserById(uid));
    } catch (error) {
      done(error)
    }
  });

  passport.use('local', new Local.Strategy(async function (username, password, done) {
    try {
      const user = await userMng.getUserByEmail(username);
      if (!user.isValidPassword(password)) { return done(null, false, "Incorrect Password"); }
      return done(null, user);
    } catch (error) {
      if (error === 'User Not Found') { return done(null, false, 'User Not Found'); }
      done(error)
    }
  }
  ));
}