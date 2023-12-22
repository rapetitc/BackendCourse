import RouterBase from "./router.base.js";
import CartsCtrlr from "../controllers/carts.ctrlr.js";

const cartsCtrlr = new CartsCtrlr

export default class CartsRouter extends RouterBase {
  init() {
    this.post('/', ["AUTHENTICATED"], cartsCtrlr.createCart);

    this.get('/:cid([\\w]{24,24})', ["AUTHENTICATED"], cartsCtrlr.getCart);

    this.delete('/:cid([\\w]{24,24})', ["AUTHENTICATED"], cartsCtrlr.deleteCart);

    this.put('/:cid([\\w]{24,24})/products/:pid([\\w]{24,24})', ["AUTHENTICATED"], cartsCtrlr.updateItemInCart);

    this.get('/:cid([\\w]{24,24})/purchase', ["USER", 'PREMIUM'], cartsCtrlr.purchase);
  }
}