import { Router } from "express";
import passport from "passport";

import SessionsController from "../controllers/sessions.controller.js";

const SessionsRouter = Router()
const SessionsCtrler = new SessionsController

SessionsRouter.post("/login/password", passport.authenticate('local', {
  session: false,
  failureRedirect: '/login'
}), SessionsCtrler.login)
SessionsRouter.get("/current", passport.authenticate('current', { session: false }), SessionsCtrler.current)
SessionsRouter.get("/logout", SessionsCtrler.logout)

export default SessionsRouter