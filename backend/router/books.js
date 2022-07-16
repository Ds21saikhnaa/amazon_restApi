import {Router} from "express";
import { protect } from "../middleware/protect.js";
import {getBooks, getBook, createBook, deleteBook, updateBook, uploadBookPhoto} from "../controller/books.js"
const bookRouter = Router();
bookRouter.route("/").get(getBooks).post(protect, createBook);
bookRouter.route("/:id").get(getBook).delete(protect, deleteBook).put(protect, updateBook);
bookRouter.route("/:id/photo").put(protect, uploadBookPhoto);
export default bookRouter;