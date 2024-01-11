import { config } from "dotenv";
import mode from "./CLI.js";

const options = {};

if (mode === "dev") {
  options.path = "./dev.env";
}

config(options);

export const PORT = process.env.PORT;

export const MONGODB_URL = process.env.MONGODB_URL;

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY;

export const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
export const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

export const EMAIL_KEY = process.env.EMAIL_KEY;
