import { Router } from "express";

import ViewsRouter from "./views.router.js";
import UsersRouter from "./users.router.js";
import SessionsRouter from "./sessions.router.js";
import ProductsRouter from "./products.router.js";
// import CartsRouter from "./carts.router.js";

const router = Router()

router.use('/api/products', new ProductsRouter().getRouter())
router.use('/', new ViewsRouter().getRouter())
router.use('/api/users', new UsersRouter().getRouter())
router.use('/api/sessions', new SessionsRouter().getRouter())
// router.use('/carts', new CartsRouter().getRouter())

export default router