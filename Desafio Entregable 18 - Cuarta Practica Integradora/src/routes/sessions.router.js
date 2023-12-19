import passport from "passport";

import RouterBase from "./router.base.js";
import SessionsCtrlr from "../controllers/sessions.ctrlr.js";

const sessionsCtrlr = new SessionsCtrlr();

export default class ProductsRouter extends RouterBase {
  init() {
    this.post("/login", ["PUBLIC"], passport.authenticate("local"), sessionsCtrlr.login);

    // this.post("/login/github", ["PUBLIC"], passport.authenticate("github"), sessionsCtrlr.loginGithub);

    this.get("/current", ["*"], sessionsCtrlr.current);

    this.post("/logout", ["*"], sessionsCtrlr.logout);
    /* TODO
    - Además, agregar una propiedad al usuario llamada “last_connection”, la cual deberá modificarse cada vez que el usuario realice un proceso de login y logout
    */
  }
}
