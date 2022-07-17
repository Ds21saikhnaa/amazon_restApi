import {Router} from "express";
import {protect, authorize} from "../middleware/protect.js";
import {userRegister, userLogin, getUser, getUsers, updateUser, deleteUser, createUser, forgotPassword, resetPassword} from "../controller/users.js";
import {getUserBooks} from "../controller/books.js";
const usersRouter = Router();
usersRouter.route("/register").post(userRegister);
usersRouter.route("/login").post(userLogin);
usersRouter.route("/forgot-password").post(forgotPassword);
usersRouter.route("/reset-password").post(resetPassword);
usersRouter.use(protect);
usersRouter.route("/").get(authorize("admin"), getUsers).post(authorize("admin"),createUser);
usersRouter.route("/:id").get(authorize("admin"),getUser).put(authorize("admin"),updateUser).delete(authorize("admin"),deleteUser);

usersRouter.route("/:id/books").get(authorize("admin", "operator", "user"), getUserBooks);
export default usersRouter;