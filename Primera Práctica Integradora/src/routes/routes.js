import { Router } from "express";
import productRoutes from "./product.router.js";
import cartRoutes from "./cart.router.js";

const routes = Router()

routes.use("/products", productRoutes)
routes.use("/carts", cartRoutes)

export default routes