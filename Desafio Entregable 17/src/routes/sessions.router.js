import passport from "passport";

import RouterBase from "./router.base.js";
import SessionsCtrlr from "../controllers/sessions.ctrlr.js";

const sessionsCtrlr = new SessionsCtrlr

export default class ProductsRouter extends RouterBase {
  init() {
    this.post('/login', ["PUBLIC"], passport.authenticate('local'), sessionsCtrlr.login); // PUBLIC

    this.get('/current', ["*"], sessionsCtrlr.current); // *

    this.post('/logout', ["*"], sessionsCtrlr.logout); // AUTHENTICATED (USERS, ADMINS, etc)
  }
}