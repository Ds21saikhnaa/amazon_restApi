import {Router} from "express";
import { protect, authorize } from "../middleware/protect.js";
import {getBooks, getBook, createBook, deleteBook, updateBook, uploadBookPhoto} from "../controller/books.js"
const bookRouter = Router();
bookRouter.route("/").get(getBooks).post(protect,authorize("admin", "operator"), createBook);
bookRouter.route("/:id").get(getBook).delete(protect,authorize("admin"), deleteBook).put(protect,authorize("admin", "operator"), updateBook);
bookRouter.route("/:id/photo").put(protect,authorize("admin", "operator"), uploadBookPhoto);
export default bookRouter;