import { Router } from "express";
import ViewsController from "../controllers/views.controller.js";
import { unauthLogged } from "../utils/sessions.js";

const viewsRoutes = Router()
const viewsCtrler = new ViewsController

viewsRoutes.get("/", viewsCtrler.index)
viewsRoutes.get("/login", unauthLogged, viewsCtrler.login)
viewsRoutes.get("/signup", unauthLogged, viewsCtrler.signup)
viewsRoutes.get("/products", viewsCtrler.products)
viewsRoutes.get("/carts/:cid", viewsCtrler.carts)
viewsRoutes.get("*", viewsCtrler.notFound)

export default viewsRoutes