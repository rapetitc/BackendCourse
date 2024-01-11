import "dotenv/config"
// import { config } from "dotenv";
// import mode from "./CLI.js";

// const options = {
//   prod: "./prod.env",
//   dev: "./dev.env",
// };

// config({ path: options[mode] ?? options["prod"] });

export const PORT = process.env.PORT;

export const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
export const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER;
export const MONGODB_DBNAME = process.env.MONGODB_DBNAME;
export const MONGODB_URL = `mongodb${MONGODB_USERNAME && MONGODB_PASSWORD && "+srv"}://${
  MONGODB_USERNAME && MONGODB_PASSWORD && `${MONGODB_USERNAME}:${MONGODB_PASSWORD}@`
}${MONGODB_CLUSTER}/${MONGODB_DBNAME}`;

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY;

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export const EMAIL_KEY = process.env.EMAIL_KEY;
