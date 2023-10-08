import { Router } from "express";
import UsersController from "../controllers/users.controller.js";

const usersRouter = Router()
const usersCtrler = new UsersController

usersRouter.post("/", usersCtrler.createUser)

export default usersRouter