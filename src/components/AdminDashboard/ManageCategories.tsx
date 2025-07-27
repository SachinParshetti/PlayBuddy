import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ManageCategories = () => {
  interface Category {
    category_id: number;
    category_name: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category | null>(null);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);

  const getCategories = () => {
    axios
      .get(`${BASE_URL}/categories`)
      .then((response) => setCategories(response.data.categories))
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleAddRow = () => {
    setNewCategory({ category_id: 0, category_name: "" });
  };

  const handleSaveCategory = () => {
    if (!newCategory?.category_id || !newCategory.category_name) {
      toast.error("Please fill all fields.");
      return;
    }

    axios
      .post(`${BASE_URL}/categories`, newCategory)
      .then(() => {
        toast.success("Category added");
        setNewCategory(null);
        getCategories();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to add category");
      });
  };

  const handleEdit = (id: number) => {
    setEditingCategoryId(id);
  };

  const handleEditChange = (
    field: keyof Category,
    value: string | number,
    id: number
  ) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.category_id === id
          ? { ...cat, [field]: field === "category_id" ? +value : value }
          : cat
      )
    );
  };

  const handleUpdate = (id: number) => {
    const updatedCategory = categories.find((cat) => cat.category_id === id);
    if (!updatedCategory) return;

    axios
      .put(`${BASE_URL}/categories/${id}`, updatedCategory)
      .then(() => {
        toast.success("Category updated");
        setEditingCategoryId(null);
        getCategories();
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to update category");
      });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${BASE_URL}/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Category has been deleted.", "success");
            getCategories();
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Failed!", "Unable to delete the category.", "error");
          });
      }
    });
  };

  return (
    <div>
      {categories.length === 0 && !newCategory ? (
        <div className="">
          <h2 className="text-xl font-semibold  my-4">No categories found</h2>
          <hr className="border-black mb-4 md:mx-40 sm:mx-0" />
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold my-4">All Categories</h2>
          <hr className="border-black mb-4 md:mx-40 sm:mx-0" />
          <div className="overflow-x-auto">
            <div className="text-start">
              <button
                onClick={handleAddRow}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                + Add Category
              </button>
            </div>
            <table className="min-w-[600px] w-full bg-white shadow-md rounded-xl text-sm sm:text-base table-auto">
              <thead>
                <tr className="bg-blue-100 text-black uppercase text-sm leading-normal">
                  <th className="p-2">Category ID</th>
                  <th className="p-2">Category Name</th>
                  <th className="p-2">Actions</th>
                </tr>

              </thead>
              <tbody>
                {newCategory && (
                  <tr className="border-t border-gray-200 hover:bg-gray-50 p-2">
                    <td>
                      <input
                        type="number"
                        value={newCategory.category_id}
                        onChange={(e) =>
                          setNewCategory({
                            ...newCategory,
                            category_id: +e.target.value,
                          })
                        }
                        className="border rounded px-2 py-1"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={newCategory.category_name}
                        onChange={(e) =>
                          setNewCategory({
                            ...newCategory,
                            category_name: e.target.value,
                          })
                        }
                        className="border rounded px-2 py-1"
                      />
                    </td>
                    <td>
                      <button
                        onClick={handleSaveCategory}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setNewCategory(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                )}

                {categories.map((category) => (
                  <tr
                    key={category.category_id}
                    className="border-t border-gray-200 hover:bg-gray-50 p-2"
                  >
                    <td className="p-2">
                      {editingCategoryId === category.category_id ? (
                        <input
                          type="number"
                          value={category.category_id}
                          onChange={(e) =>
                            handleEditChange(
                              "category_id",
                              +e.target.value,
                              category.category_id
                            )
                          }
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        category.category_id
                      )}
                    </td>
                    <td className="p-2">
                      {editingCategoryId === category.category_id ? (
                        <input
                          type="text"
                          value={category.category_name}
                          onChange={(e) =>
                            handleEditChange(
                              "category_name",
                              e.target.value,
                              category.category_id
                            )
                          }
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        category.category_name
                      )}
                    </td>
                    <td className="p-2">
                      {editingCategoryId === category.category_id ? (
                        <button
                          onClick={() => handleUpdate(category.category_id)}
                          className="text-green-500 hover:text-green-700 font-semibold mr-3"
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(category.category_id)}
                          className="text-blue-500 hover:text-blue-700 font-semibold mr-3"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(category.category_id)}
                        className="text-red-500 hover:text-red-700 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
