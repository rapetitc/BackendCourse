import { Router } from "express";
import studentRoutes from "./student.router.js";
import viewsRoutes from "./views.router.js";

const routes = Router()

routes.use("/api/students", studentRoutes)
routes.use("/", viewsRoutes)

export default routes