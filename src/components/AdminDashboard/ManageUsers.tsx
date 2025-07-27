import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ManageUsers = () => {
  interface User {
    _id: string;
    username: string;
    email: string;
    mobile: string;
  }

  const [users, setUsers] = useState<User[]>([]);

  const getUsers = () => {
    axios
      .get(`${BASE_URL}/users`)
      .then((response) => setUsers(response.data.users))
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (userId: string) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This action cannot be undone!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${BASE_URL}/users/${userId}`);
      Swal.fire('Deleted!', 'User has been removed.', 'success');
      getUsers(); 
    } catch (error) {
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  }
};


  return (
    <div className="p-2 sm:p-4">
      {users.length === 0 ? (
        <div>
          <h2 className="text-xl mt-4 font-semibold mb-4 text-center">
            No Users Found
          </h2>
          <hr className="border-black mb-4 md:mx-40 sm:mx-20" />
        </div>
      ) : (
        <div>
          <h2 className="text-xl mt-4 font-semibold mb-4 text-center">
            All Users
          </h2>
          <hr className="border-black mb-4 mx-40 sm:mx-20" />
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-[600px] w-full bg-white shadow-md rounded-xl text-sm sm:text-base table-auto">
              <thead className="bg-blue-100">
                <tr className=" text-xs sm:text-sm text-black uppercase tracking-wider">
                  <th className="py-3 px-2">Username</th>
                  <th className="py-3 px-2">Email</th>
                  <th className="py-3 px-2">Mobile</th>
                  <th className="py-3 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-2 px-2">{user.username}</td>
                    <td className="py-2 px-2">{user.email}</td>
                    <td className="py-2 px-2">{user.mobile}</td>
                    <td className="py-2 px-2">
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-2 sm:px-4 rounded text-xs sm:text-sm "
                      >
                       
                        Remove
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

export default ManageUsers;
