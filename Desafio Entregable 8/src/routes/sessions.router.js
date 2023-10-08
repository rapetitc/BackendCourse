import { Router } from "express";
import SessionsController from "../controllers/sessions.controller.js";

const sessionsRouter = Router()
const sessionsCtrler = new SessionsController

sessionsRouter.post("/login", sessionsCtrler.login)
sessionsRouter.get("/logout", sessionsCtrler.logout)

export default sessionsRouter