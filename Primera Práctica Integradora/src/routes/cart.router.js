import { Router } from "express";
import CartController from "../controllers/cart.controller.js";

const cartRoutes = Router()
const cartController = new CartController

cartRoutes.post("/", cartController.addCart)
cartRoutes.get("/:cid", cartController.getCart)
cartRoutes.put("/:cid/product/:pid", cartController.updateCart)
cartRoutes.delete("/:cid", cartController.removeCart)

export default cartRoutes