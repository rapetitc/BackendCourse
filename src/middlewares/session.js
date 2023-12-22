import session from "express-session";
import MongoStore from "connect-mongo";

import { MONGODB_URL, SESSION_SECRET_KEY } from "../config/env.js";

export default session({
  secret: SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 2 * 60 * 60 * 1000,
  },
  store: MongoStore.create({
    mongoUrl: MONGODB_URL,
  }),
});
