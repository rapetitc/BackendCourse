import { Router } from "express"
import ViewsCtlr from "../controllers/views.controller.js"

const ViewsRoutes = Router()
const viewsCtlr = new ViewsCtlr()

ViewsRoutes.get("/", viewsCtlr.home)
ViewsRoutes.get("/realtimeproducts", viewsCtlr.realtime)

export default ViewsRoutes