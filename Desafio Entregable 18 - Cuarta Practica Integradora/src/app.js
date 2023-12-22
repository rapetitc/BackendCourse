import express from "express";
import path from "path";
import mongoose from "mongoose";
import passport from "passport";
import compression from "express-compression";
import swaggerUi from "swagger-ui-express";

import { PORT, MONGODB_URL, ORIGIN } from "./config/env.js";
import cors from "./middlewares/cors.js";
import session from "./middlewares/session.js";
import usePassport from "./config/passport.js";
import router from "./routes/router.js";
import logger from "./middlewares/logger.js";
import customError from "./middlewares/customError.js";
import docs from "./config/docs.js";

const app = express();

// DB Connection
mongoose.connect(MONGODB_URL).then(() => {
  console.log(`Data Base Server is now connected, ${MONGODB_URL.replace(new RegExp(":\\w*@"), ":***@")}`);
});

// Middelwares
app.use(cors);
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression({ brotli: { enabled: true, zlib: {} } }));

// Sessions
app.use(session);
usePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(docs));
app.use("/storage", express.static("./storage"));
app.use("/", express.static("./public"));
app.use("*", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
});

// Error Handler Middleware
app.use(customError);

app.listen(PORT, () => {
  console.clear();
  console.log(`Server is now up, you can go and visit ${ORIGIN} and review this project, hope you enjoy it! :)`);
});
