import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ManageVideos = ({ onEdit , refreshFlag}) => {   
  interface Video {
    _id: string;
    video_id: number;
    title: string;
    description: string;
    url: string;
    likes: number;
    views: number;
    category_id: number;
  }

  interface Category {
    _id: string;
    category_id: number;
    category_name: string;
  }

 

  const [videos, setVideos] = useState<Video[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
 
  const getVideos = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/videos`);
      setVideos(res.data.videos || []);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/categories`);
      setCategories(res.data.categories || []);
    
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // delete video

 const handleDelete = async (videoId: Number) => {
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
      await axios.delete(`${BASE_URL}/videos/${videoId}`);
      Swal.fire('Deleted!', 'Video has been deleted.', 'success');
      getVideos(); 
    } catch (error) {
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  }
};




  useEffect(() => {
    getVideos();
    getCategories();
  }, [refreshFlag]);

  if (loading) return <div className="flex justify-center items-center h-screen"><img src="images/loading-load.gif" alt=" loading../" height={100} width={100} /></div>;

  return (
    <div className="overflow-x-auto w-full  sm:px-0  md:px-6 lg:px-8 sm:mx-0 ">
      <h2 className="text-xl font-semibold mb-2 text-center">All Videos</h2>
      <hr className="border-black mb-4 md:mx-40 sm:mx-0" />

      {videos.length === 0 ? (
       <div>
         <p className="text-center text-gray-500">No videos found.</p>
         <hr className="border-black mb-4 mx-40 sm:mx-0" />
       </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md borde sm:mx-0">
          <table className="w-full bg-white shadow-md rounded-xl text-center text-sm sm:text-base table-auto">
            <thead className="bg-blue-100 ">
              <tr>
                <th className="py-3 px-2 sm:px-4">Video</th>
                <th className="py-3 px-2 sm:px-4">Title</th>
                <th className="py-3 px-2 sm:px-4">Category</th>
                <th className="py-3 px-2 sm:px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.map((video) => (
                <tr key={video._id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-2 sm:px-4">
                    <iframe
                      src={video.url}
                      height="60"
                      width="100"
                      title={video.title}
                      className="rounded"
                    ></iframe>
                  </td>
                  <td className="py-3 px-2 sm:px-4">{video.title}</td>
                  <td className="py-3 px-2 sm:px-4">
                    {
                      categories.find(
                        (cat) => cat.category_id === video.category_id
                      )?.category_name || "Unknown"
                    }
                  </td>
                  <td className="py-3 px-2 sm:px-4 space-x-1">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-xs sm:text-sm" onClick={() => onEdit(video)}>
                     <EditNoteIcon/>
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-xs sm:text-sm sm:space-y-2" onClick={() => handleDelete(video.video_id)}>
                      <DeleteIcon/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageVideos;
