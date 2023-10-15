import RouterBase from "./router.base.js";
import CartsCtrlr from "../controllers/carts.ctrlr.js";

const cartsCtrlr = new CartsCtrlr

export default class CartsRouter extends RouterBase {
  init() {
    this.post('/', ["PUBLIC"], cartsCtrlr.createCart);

    this.get('/:cid([\\w]{24,24})', ["PUBLIC"], cartsCtrlr.getCart);

    this.put('/:cid([\\w]{24,24})/products/:pid([\\w]{24,24})', ["OWNER", "ADMIN"], cartsCtrlr.updateCart);

    this.delete('/:cid([\\w]{24,24})', ["OWNER", "ADMIN"], cartsCtrlr.deleteCart);
  }
}