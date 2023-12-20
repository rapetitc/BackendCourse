import Local from "passport-local";
import GitHub from "passport-github2";
import UsersMng from "../dao/MongoDB/users.mng.js";
// import isValidPassword from "../utils/isValidPassword.js";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "./env.js";

const userMng = new UsersMng();

export default function usePassport(passport) {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (uid, done) {
    try {
      done(null, await userMng.getUserById(uid));
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    "local",
    new Local.Strategy(async function (username, password, done) {
      try {
        const user = await userMng.getUserByEmail(username);
        if (!(await user.isValidPassword(password, user.password))) {
          return done(null, false, "Incorrect Password");
        }
        return done(null, user);
      } catch (error) {
        if (error.message === "User Not Found") {
          return done(null, false, "User Not Found");
        }
        done(error);
      }
    }),
  );

  passport.use(
    "github",
    new GitHub.Strategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/sessions/github/callback",
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const { id, email } = profile._json;
          const user = await userMng.getUserByEmail(email);
          if (user.connected_apps.github_account === id) return done(null, user);
          done(null, false);
        } catch (error) {
          if (error.code === 3) return done(null, false, "User Not Found");
          done(error);
        }
      },
    ),
  );
}
