import Local from "passport-local";
import GitHub from "passport-github2";
import UsersMng from "../dao/MongoDB/users.mng.js";
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from "./env.js";
import mode from "./CLI.js";
import { serverOrigin } from "./modeOptions.js";

const userMng = new UsersMng();

export default function usePassport(passport) {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(async function (uid, done) {
    try {
      done(null, await userMng.getUserById(uid));
    } catch (error) {
      if (error.code === 2) return done(null, false);
      done(error);
    }
  });

  passport.use(
    "local",
    new Local.Strategy(async function (username, password, done) {
      try {
        const user = await userMng.getUserByEmail(username);
        if (!(await user.isValidPassword(password, user.password))) return done(null, false);
        return done(null, user);
      } catch (error) {
        if (error.code === 2) return done(null, false);
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
        callbackURL: `${serverOrigin[mode]}/api/sessions/github/callback`,
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
