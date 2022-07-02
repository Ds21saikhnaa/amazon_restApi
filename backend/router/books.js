import {Router} from "express";
import {getBooks, getBook, createBook, deleteBook, updateBook} from "../controller/books.js"
const bookRouter = Router();
bookRouter.route("/").get(getBooks).post(createBook);
bookRouter.route("/:id").get(getBook).delete(deleteBook).put(updateBook);
export default bookRouter;