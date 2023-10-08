import { Router } from "express";
import UsersController from "../controllers/users.controller.js";

const UsersRouter = Router()
const UsersCtrler = new UsersController

UsersRouter.post("/", UsersCtrler.createUser)

export default UsersRouter