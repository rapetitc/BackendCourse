import { Router } from "express";

import UsersRouter from "./users.router.js";
import SessionsRouter from "./sessions.router.js";
import ProductsRouter from "./products.router.js";
import CartsRouter from "./carts.router.js";
import TicketsRouter from "./tickets.router.js";

const router = Router()

router.use('/users', new UsersRouter().getRouter())
router.use('/sessions', new SessionsRouter().getRouter())
router.use('/products', new ProductsRouter().getRouter())
router.use('/carts', new CartsRouter().getRouter())
router.use('/tickets', new TicketsRouter().getRouter())

export default router