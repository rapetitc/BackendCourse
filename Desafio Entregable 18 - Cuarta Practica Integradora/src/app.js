import express from "express";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";

import { PORT, MONGODB_URL, ORIGIN } from "./config/env.js";
import cors from "./middlewares/cors.js";
import session from "./middlewares/session.js";
import usePassport from "./config/passport.js";
import router from "./routes/router.js";
import logger from "./middlewares/logger.js";
import customError from "./middlewares/customError.js";

const app = express();

mongoose.connect(MONGODB_URL).then(() => {
  console.log(`Data Base Server is now connected, ${MONGODB_URL.replace(new RegExp(":\\w*@"), ":***@")}`);
});

app.use(cors);
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session);
usePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);
app.use("/storage", express.static("./storage"));
app.use("/", express.static("./public"));
app.use("*", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
});
app.use(customError);

app.listen(PORT, () => {
  console.clear();
  console.log(`Server is now up, you can go and visit ${ORIGIN} and review this project, hope you enjoy it! :)`);
});
