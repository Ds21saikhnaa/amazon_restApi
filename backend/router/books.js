import {Router} from "express";
import {getBooks, getBook, createBook, deleteBook, updateBook, uploadBookPhoto} from "../controller/books.js"
const bookRouter = Router();
bookRouter.route("/").get(getBooks).post(createBook);
bookRouter.route("/:id").get(getBook).delete(deleteBook).put(updateBook);
bookRouter.route("/:id/photo").put(uploadBookPhoto);
export default bookRouter;