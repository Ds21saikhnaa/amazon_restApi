import {Router} from "express";
import {getBooks} from "../controller/books.js"
const bookRouter = Router();
bookRouter.route("/").get(getBooks);
export default bookRouter;