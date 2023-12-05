import RouterBase from "./router.base.js";
import UsersCtrlr from "../controllers/users.ctrlr.js";

const usersCtrlr = new UsersCtrlr

export default class UsersRouter extends RouterBase {
  init() {
    this.post('/', ['PUBLIC'], usersCtrlr.createUser);

    this.get('/:uid([\\w]{24,24})', ["AUTHENTICATED"], usersCtrlr.getUser);

    this.put('/:uid([\\w]{24,24})', ['AUTHENTICATED'], usersCtrlr.updateUser);

    this.put('/premium/:uid([\\w]{24,24})', ["*"], usersCtrlr.updateUserPremiumStatus);

    this.delete('/:uid([\\w]{24,24})', ['AUTHENTICATED'], usersCtrlr.deleteUser);

    this.post('/recovery-password', ['PUBLIC'], usersCtrlr.recoveryPassword1stStep);

    this.get('/recovery-password/:token', ['PUBLIC'], usersCtrlr.recoveryPassword2ndStep);

    this.put('/recovery-password/:token', ['PUBLIC'], usersCtrlr.recoveryPassword3rdStep);
  }
}