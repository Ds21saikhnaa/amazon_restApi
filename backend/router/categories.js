import {Router} from "express";
import { protect } from "../middleware/protect.js";
import {getCategories, getCategory, deleteCategory, updateCategory, createCategory} from "../controller/categories.js";
import {getCategoryBooks} from "../controller/books.js";
const catRouter = Router();
// /api/v1/categories
catRouter.route("/").get(getCategories).post(protect, createCategory);
// /api/v1/categories/:id/books
catRouter.route("/:categoryId/books").get(getCategoryBooks);
catRouter.route("/:id").get(getCategory).put(protect, updateCategory).delete(protect, deleteCategory);
export default catRouter;