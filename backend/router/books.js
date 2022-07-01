import {Router} from "express";
import {getBooks, getBook, createBook} from "../controller/books.js"
const bookRouter = Router();
bookRouter.route("/").get(getBooks).post(createBook);
bookRouter.route("/:id").get(getBook);
export default bookRouter;