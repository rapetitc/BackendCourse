import RouterBase from "./router.base.js";
import ProductsCtrlr from "../controllers/products.ctrlr.js";
import { uploadProductThumbnails } from "../utils/uploaders.js";

const productsCtrlr = new ProductsCtrlr();

export default class ProductsRouter extends RouterBase {
  init() {
    this.post("/", ["PREMIUM"], uploadProductThumbnails.array("thumbnails", 9), productsCtrlr.createProduct);

    this.get("/", ["*"], productsCtrlr.getProducts);

    this.get("/:pid([\\w]{24,24})", ["*"], productsCtrlr.getProduct);

    this.put("/:pid([\\w]{24,24})", ["PREMIUM", "ADMIN"], uploadProductThumbnails.array("thumbnails", 9), productsCtrlr.updateProduct);

    this.delete("/:pid([\\w]{24,24})", ["PREMIUM", "ADMIN"], productsCtrlr.removeProduct);
  }
}
