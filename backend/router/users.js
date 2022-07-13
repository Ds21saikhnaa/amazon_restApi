import {Router} from "express";
import {userRegister, userLogin} from "../controller/users.js"
const usersRouter = Router();
usersRouter.route("/").post(userRegister);
usersRouter.route("/login").post(userLogin);
export default usersRouter;