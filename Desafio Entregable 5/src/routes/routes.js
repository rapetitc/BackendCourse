import { Router } from "express";
import ViewsRoutes from "./views.route.js";
import ProdsRoutes from "./products.route.js";

const routes = Router()

routes.use("/", ViewsRoutes)
routes.use("/api", ProdsRoutes)

export default routes