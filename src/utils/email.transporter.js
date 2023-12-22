import { createTransport } from "nodemailer";
import fs from "fs";
import path from "path";

import { EMAIL_KEY } from "../config/env.js";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "rapetitc@gmail.com",
    pass: EMAIL_KEY,
  },
});

export const recoveryPassowrdTemplate = async (token) => {
  const html = fs.readFileSync(path.resolve("src/utils/emails/recoveryPassowrdTemplate.html"), "utf-8");
  return html.replace("<<token>>", token);
};

export default transporter;
