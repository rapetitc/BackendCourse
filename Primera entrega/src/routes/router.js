import { Router } from "express";
import prodRoutes from "./productsRoute.js";
import cartsRoutes from "./cartsRoute.js";

const routes = Router()

routes.use("/products", prodRoutes)
routes.use("/carts", cartsRoutes)

export default routes