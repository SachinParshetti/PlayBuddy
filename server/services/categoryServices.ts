import Category from "../models/category.js";

interface ICategoryInput {
  category_id: number;
  category_name: string;
}

export const categoryService = {
  createCategory: async ({ category_id, category_name }: ICategoryInput) => {
    const category = new Category({ category_id, category_name });
    await category.save();
    return { message: "Category created", category };
  },

  getCategories: async () => {
    const categories = await Category.find({});
    return { message: "Categories fetched", categories };
  },

  getCategoryById: async (id: string) => {
    console.log(id)
    const category = await Category.findOne({ category_id: Number(id) });
    if (!category) {
      throw new Error("Category not found");
    }
    return { message: "Category found", category };
  },

  updateCategory: async (id: string, category_name: string) => {
    const updated = await Category.findOneAndUpdate(
      { category_id: Number(id) },
      { category_name },
      { new: true }
    );
    if (!updated) {
      throw new Error("Category not found or failed to update");
    }
    return { message: "Category updated", category: updated };
  },

  deleteCategory: async (id: string) => {
    const deleted = await Category.findOneAndDelete({ category_id: Number(id) });
    if (!deleted) {
      throw new Error("Failed to delete category");
    }
    return { message: "Category deleted", category: deleted };
  }

};
