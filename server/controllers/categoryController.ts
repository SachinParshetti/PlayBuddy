import { Request, Response } from "express";
import { categoryService } from "../services/categoryServices.js";

export const categoryController = {
    createCategory: async (req: Request, res: Response) => {
        try {
            const { category_id, category_name } = req.body;
            const result = await categoryService.createCategory({ category_id, category_name });
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: "Failed to create category" });
        }
    },
    getCategories: async (_req: Request, res: Response) => {
        try {
            const result = await categoryService.getCategories();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: "Failed to get categories" });
        }
    },
    getCategoryById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await categoryService.getCategoryById(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: "Failed to get the category by id" });
        }
    },
    updateCategory: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { category_name } = req.body;
            const result = await categoryService.updateCategory(id, category_name);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: "Failed to update the category" });
        }
    },
    deleteCategory: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const result = await categoryService.deleteCategory(id);
            res.status(200).json(result);
        } catch (error) {
            res.status(404).json({ error: "Failed to delete category" });
        }
    }
};

export default categoryController;