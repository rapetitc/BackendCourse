import { Router } from "express";
import productRoutes from "./product.router.js";
import cartRoutes from "./cart.router.js";

const routes = Router()

routes.use("/api/products", productRoutes)
routes.use("/api/carts", cartRoutes)

export default routes