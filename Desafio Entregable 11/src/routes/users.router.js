import RouterBase from "./router.base.js";
import UsersCtrlr from "../controllers/users.ctrlr.js";

const usersCtrlr = new UsersCtrlr

export default class UsersRouter extends RouterBase {
  init() {
    this.post('/', ['PUBLIC'], usersCtrlr.createUser); // PUBLIC

    this.get('/:uid([\\w]{24,24})', ["PUBLIC"], usersCtrlr.getUser); // AUTHENTICATED

    this.put('/:uid([\\w]{24,24})', ['PUBLIC'], usersCtrlr.updateUser); // OWNER, ADMIN

    this.delete('/:uid([\\w]{24,24})', ['PUBLIC'], usersCtrlr.deleteUser); // OWNER, ADMIN
  }
}