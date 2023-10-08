import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const ProductRouter = Router()
const ProductCtrl = new ProductController

ProductRouter.post("/", ProductCtrl.addProduct)
ProductRouter.get("/", ProductCtrl.getProducts)
ProductRouter.get("/:pid", ProductCtrl.getProduct)
ProductRouter.put("/:pid", ProductCtrl.updateProduct)
ProductRouter.delete("/:pid", ProductCtrl.removeProduct)

export default ProductRouter