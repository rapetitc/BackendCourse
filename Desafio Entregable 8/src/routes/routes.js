import { Router } from "express";
import viewsRoutes from "./views.router.js";
import usersRouter from "./users.router.js";
import sessionsRouter from "./sessions.router.js";
import productRoutes from "./product.router.js";
import cartRoutes from "./cart.router.js";

const routes = Router()

routes.use("/api/products", productRoutes)
routes.use("/api/carts", cartRoutes)
routes.use("/api/users", usersRouter)
routes.use("/api/sessions", sessionsRouter)
routes.use("/", viewsRoutes)

export default routes