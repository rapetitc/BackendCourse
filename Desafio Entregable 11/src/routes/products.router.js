import RouterBase from "./router.base.js";
import ProductsCtrlr from "../controllers/products.ctrlr.js";

const productsCtrlr = new ProductsCtrlr

export default class ProductsRouter extends RouterBase {
  init() {
    this.post('/', ["USER"], productsCtrlr.createProduct);

    this.get('/', ["PUBLIC"], productsCtrlr.getProducts);

    this.get('/:pid([\\w]{24,24})', ["PUBLIC"], productsCtrlr.getProduct);
   
    this.put('/:pid([\\w]{24,24})', ["OWNER", "ADMIN"], productsCtrlr.getProduct);
    
    this.delete('/:pid([\\w]{24,24})', ["OWNER", "ADMIN"], productsCtrlr.removeProduct);
  }
}