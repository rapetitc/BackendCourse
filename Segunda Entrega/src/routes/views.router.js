import { Router } from "express";
import ViewsController from "../controllers/views.controller.js";

const viewsRoutes = Router()
const viewsCtrler = new ViewsController

viewsRoutes.get("/", viewsCtrler.index)
viewsRoutes.get("/products", viewsCtrler.products)
viewsRoutes.get("*", viewsCtrler.notFound)

export default viewsRoutes