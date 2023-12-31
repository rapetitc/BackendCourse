import passport from "passport";

import RouterBase from "./router.base.js";
import SessionsCtrlr from "../controllers/sessions.ctrlr.js";

const sessionsCtrlr = new SessionsCtrlr();

export default class ProductsRouter extends RouterBase {
  init() {
    this.post("/login", ["PUBLIC"], sessionsCtrlr.login);

    this.get("/github", ["PUBLIC"], passport.authenticate("github", { scope: ["email"] }));

    this.get("/github/callback", ["PUBLIC"], passport.authenticate("github"), sessionsCtrlr.github);

    this.get("/current", ["*"], sessionsCtrlr.current);

    this.post("/logout", ["*"], sessionsCtrlr.logout);
  }
}
