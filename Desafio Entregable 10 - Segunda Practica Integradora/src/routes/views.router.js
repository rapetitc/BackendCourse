import { Router } from "express";
import passport from "passport";

import ViewsController from "../controllers/views.controller.js";
import { auth } from "../utils/auth.js";

const ViewsRouter = Router()
const ViewsCtrler = new ViewsController

ViewsRouter.get("/", passport.authenticate('current', { session: false }), auth(), ViewsCtrler.index)
ViewsRouter.get("/signup", auth({ authLoggedUsers: false }), ViewsCtrler.signup)
ViewsRouter.get("/login", auth({ authLoggedUsers: false }), ViewsCtrler.login)
ViewsRouter.get("/profile", passport.authenticate('current', { session: false }), auth({ authGuestUsers: false }), ViewsCtrler.profile)
ViewsRouter.get("/products", auth(), ViewsCtrler.products)
ViewsRouter.get("/carts/:cid", auth({ authGuestUsers: false }), ViewsCtrler.carts)
ViewsRouter.get("/notfound", ViewsCtrler.notFound)

export default ViewsRouter