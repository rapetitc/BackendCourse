import RouterBase from "./router.base.js";
import ViewsCtrlr from "../controllers/views.ctrlr.js";

const viewsCtrlr = new ViewsCtrlr

export default class ViewsRouter extends RouterBase {
  init() {
    this.get('/', ["*"], viewsCtrlr.index);

    this.get('/signup', ["PUBLIC"], viewsCtrlr.signup);

    this.get('/login', ["PUBLIC"], viewsCtrlr.login);

    this.get('/profile', ["USER", "ADMIN"], viewsCtrlr.profile);
  }
}