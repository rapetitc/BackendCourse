import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const productRoutes = Router()
const productController = new ProductController

productRoutes.post("/", productController.addProduct)
productRoutes.get("/", productController.getProducts)
productRoutes.get("/:pid", productController.getProduct)
productRoutes.put("/:pid", productController.updateProduct)
productRoutes.delete("/:pid", productController.removeProduct)

export default productRoutes