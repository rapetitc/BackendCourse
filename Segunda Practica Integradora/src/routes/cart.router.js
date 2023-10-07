import { Router } from "express";
import CartController from "../controllers/cart.controller.js";

const CartRouter = Router()
const CartCtrl = new CartController

CartRouter.post("/", CartCtrl.addCart)
CartRouter.get("/:cid", CartCtrl.getCart)
CartRouter.put("/:cid", CartCtrl.updateCart)
CartRouter.delete("/:cid", CartCtrl.deleteCart)

CartRouter.put("/:cid/products/:pid", CartCtrl.updateItem)
CartRouter.delete("/:cid/products/:pid", CartCtrl.removeItem)

export default CartRouter