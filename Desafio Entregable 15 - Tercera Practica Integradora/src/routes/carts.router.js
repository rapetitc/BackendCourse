import RouterBase from "./router.base.js";
import CartsCtrlr from "../controllers/carts.ctrlr.js";

const cartsCtrlr = new CartsCtrlr

export default class CartsRouter extends RouterBase {
  init() {
    this.post('/', ["AUTHENTICATED"], cartsCtrlr.createCart); // AUTHENTICATED

    this.get('/:cid([\\w]{24,24})', ["USER", "ADMIN"], cartsCtrlr.getCart); // USER (OWNER), ADMIN

    this.delete('/:cid([\\w]{24,24})', ["USER", "ADMIN"], cartsCtrlr.deleteCart); // USER (OWNER), ADMIN

    this.put('/:cid([\\w]{24,24})/products/:pid([\\w]{24,24})', ["USER", "ADMIN"], cartsCtrlr.updateItemInCart); // USER (OWNER), ADMIN

    this.get('/:cid([\\w]{24,24})/purchase', ["USER"], cartsCtrlr.purchase); // USER (OWNER)
  }
}