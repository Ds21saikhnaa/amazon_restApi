import {Router} from "express";
import {getCategories, getCategory, deleteCategory, updateCategory, createCategory} from "../controller/categories.js"
const catRouter = Router();
catRouter.route("/").get(getCategories).post(createCategory);
catRouter.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory);
export default catRouter;