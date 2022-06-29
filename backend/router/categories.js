import {Router} from "express";
import {getCategories, getCategory, deleteCategory, updateCategory, createCategory} from "../controller/categories.js";
import {getBooks} from "../controller/books.js";
const catRouter = Router();
// /api/v1/categories
catRouter.route("/").get(getCategories).post(createCategory);
// /api/v1/categories/:id/books
catRouter.route("/:categoryId/books").get(getBooks);
catRouter.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory);
export default catRouter;