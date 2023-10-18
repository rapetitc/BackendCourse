import RouterBase from "./router.base.js";
import ViewsCtrlr from "../controllers/views.ctrlr.js";

const viewsCtrlr = new ViewsCtrlr

export default class ViewsRouter extends RouterBase {
  init() {
    this.get('/', ["*"], viewsCtrlr.index); // *

    this.get('/signup', ["PUBLIC"], viewsCtrlr.signup); // PUBLIC

    this.get('/login', ["PUBLIC"], viewsCtrlr.login); // PUBLIC

    this.get('/profile', ["USER"], viewsCtrlr.profile); // AUTHENTICATED

    this.get('/sell', ["USER"], viewsCtrlr.sell); // AUTHENTICATED

    this.get('/products/:pid', ["*"], viewsCtrlr.product); // *

    this.get('/cart', ["*"], viewsCtrlr.cart); // USER
    
    this.get('/working', ["*"], viewsCtrlr.working); // *

    this.get('*', ["*"], viewsCtrlr.notfound); // *
  }
}