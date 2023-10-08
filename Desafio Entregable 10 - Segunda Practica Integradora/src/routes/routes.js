import { Router } from "express";
import UsersRouter from "./users.router.js";
import SessionsRouter from "./sessions.router.js";
import ProductRouter from "./product.router.js";
import CartRouter from "./cart.router.js";
import ViewsRouter from "./views.router.js";

const routes = Router()

routes.use("/api/users", UsersRouter)
routes.use("/api/sessions", SessionsRouter)
routes.use("/api/products", ProductRouter)
routes.use("/api/carts", CartRouter)
routes.use("/", ViewsRouter)

routes.get('*', (req, res) => {
  res.redirect('/notfound')
 })

export default routes