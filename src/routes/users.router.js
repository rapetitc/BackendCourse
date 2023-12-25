import RouterBase from "./router.base.js";
import UsersCtrlr from "../controllers/users.ctrlr.js";
import { uploadProfilePicture, uploadUserDocs } from "../utils/uploaders.js";

const usersCtrlr = new UsersCtrlr();

export default class UsersRouter extends RouterBase {
  init() {
    this.post("/", ["PUBLIC"], usersCtrlr.createUser);

    this.get("/:uid([\\w]{24,24})", ["AUTHENTICATED"], usersCtrlr.getUserById);

    this.put("/:uid((this|[\\w]{24,24}))", ["AUTHENTICATED"], uploadProfilePicture.single("profile_picture"), usersCtrlr.updateUser);

    this.delete("/:uid((this|[\\w]{24,24}))", ["AUTHENTICATED"], usersCtrlr.deleteUser);

    this.put("/premium/:uid((this|[\\w]{24,24}))", ["AUTHENTICATED"], usersCtrlr.updateUserPremiumStatus);

    this.post("/recovery-password", ["PUBLIC"], usersCtrlr.recoveryPassword1stStep);

    this.get("/recovery-password/:token", ["PUBLIC"], usersCtrlr.recoveryPassword2ndStep);

    this.put("/recovery-password/:token", ["PUBLIC"], usersCtrlr.recoveryPassword3rdStep);

    this.put(
      "/:uid((this|[\\w]{24,24}))/documents",
      ["AUTHENTICATED"],
      uploadUserDocs.fields([
        { name: "identification", maxCount: 1 },
        { name: "address_certificate", maxCount: 1 },
        { name: "bank_account_certificate", maxCount: 1 },
      ]),
      usersCtrlr.updateUserDocs,
    );
  }
}
