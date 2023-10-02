import { Router } from "express";
import CartController from "../controllers/cart.controller.js";

const cartRoutes = Router()
const cartController = new CartController

cartRoutes.post("/", cartController.addCart)
cartRoutes.get("/:cid", cartController.getCart)
cartRoutes.put("/:cid", cartController.updateCart)
cartRoutes.delete("/:cid", cartController.deleteCart)

cartRoutes.put("/:cid/products/:pid", cartController.updateItem)
cartRoutes.delete("/:cid/products/:pid", cartController.removeItem)

export default cartRoutes