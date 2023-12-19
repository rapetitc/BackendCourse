import Local from 'passport-local'
import UsersMng from '../dao/MongoDB/users.mng.js'
import isValidPassword from '../utils/isValidPassword.js';

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
      if (! await isValidPassword(password, user.password)) { return done(null, false, "Incorrect Password"); }
      return done(null, user);
    } catch (error) {
      if (error.message === 'User Not Found') { return done(null, false, 'User Not Found'); }
      done(error)
    }
  }
  ));
  
  // passport.use('github',);
}