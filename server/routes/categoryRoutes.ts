import { Router } from "express";
import { categoryController } from "../controllers/categoryController.js";

const CategoryRoutes = Router();

CategoryRoutes.post("/", categoryController.createCategory);
CategoryRoutes.get("/", categoryController.getCategories);
CategoryRoutes.get("/:id", categoryController.getCategoryById);
CategoryRoutes.put("/:id", categoryController.updateCategory);
CategoryRoutes.delete("/:id", categoryController.deleteCategory);

export default CategoryRoutes;
