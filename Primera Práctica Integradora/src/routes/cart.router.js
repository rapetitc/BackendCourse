import { Router } from "express";
import CartController from "../controllers/cart.controller.js";

const cartRoutes = Router()
const cartController = new CartController

cartRoutes.post("/", cartController.createCart)
cartRoutes.get("/:id", cartController.getCartByID)
cartRoutes.put("/", cartController.updateCart)
cartRoutes.delete("/:id", cartController.removeCart)

export default cartRoutes