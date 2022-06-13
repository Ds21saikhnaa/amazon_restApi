import {Router} from "express";
import {getCategories, getCategory, deleteCategory, updateCategory, createCategory} from "../controller/categories.js"
const router = Router();
router.route("/").get(getCategories).post(createCategory);
router.route("/:id").get(getCategory).put(updateCategory).delete(deleteCategory);
export default router;