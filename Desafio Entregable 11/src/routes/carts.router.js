import RouterBase from "./router.base.js";
import CartsCtrlr from "../controllers/carts.ctrlr.js";

const cartsCtrlr = new CartsCtrlr

export default class CartsRouter extends RouterBase {
  init() {
    this.post('/', ["AUTHENTICATED"], cartsCtrlr.createCart); // AUTHENTICATED

    this.get('/:cid([\\w]{24,24})', ["USER", "ADMIN"], cartsCtrlr.getCart); // OWNER, ADMIN

    this.put('/:cid([\\w]{24,24})/products/:pid([\\w]{24,24})', ["USER", "ADMIN"], cartsCtrlr.updateItemInCart); // OWNER, ADMIN

    this.delete('/:cid([\\w]{24,24})', ["USER", "ADMIN"], cartsCtrlr.deleteCart); // OWNER, ADMIN
  }
}