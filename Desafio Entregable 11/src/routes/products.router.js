import RouterBase from "./router.base.js";
import ProductsCtrlr from "../controllers/products.ctrlr.js";

const productsCtrlr = new ProductsCtrlr

export default class ProductsRouter extends RouterBase {
  init() {
    this.post('/', ["USER"], productsCtrlr.createProduct); //AUTHENTICATED (USER, ADMIN)

    this.get('/', ["*"], productsCtrlr.getProducts); // ALL

    this.get('/:pid([\\w]{24,24})', ["*"], productsCtrlr.getProduct); // PUBLIC

    this.put('/:pid([\\w]{24,24})', ["OWNER", "ADMIN"], productsCtrlr.getProduct); //AUTHENTICATED (OWNER, ADMIN)

    this.delete('/:pid([\\w]{24,24})', ["OWNER", "ADMIN"], productsCtrlr.removeProduct); //AUTHENTICATED (OWNER, ADMIN)
  }
}