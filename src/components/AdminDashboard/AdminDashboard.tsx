import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/adminNavbar";
import ManageVideos from "./ManageVideo";
import ManageUsers from "./ManageUsers";
import ManageCategories from "./ManageCategories";
import AddVideoModal from "./Modal"; 
import { toast } from "react-toastify";



interface Video {
  video_id: number;
  title: string;
  description: string;
  url: string;
  likes: number;
  views: number;
  category_id: number;
}
function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("videos");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState <Video | undefined>();
  const [refresh, setRefresh] = useState(false)
  

  // for updating video list after edited
  function handleRefresh()
  {
    setRefresh( ref => !ref)
  }

  function handleSignOut() {
    localStorage.removeItem("admin-Token");
    navigate("/");
  }

  function handleTabChange(tab: string) {
    setActiveTab(tab);
    if (tab === "add") {
      setSelectedVideo(undefined); 
      setIsAddModalOpen(true);
    }
  }

  function handleAddVideoSubmit(videoData: Video) {
    if (selectedVideo) {
      // Update existing video
      axios.put(`http://localhost:4000/videos/${selectedVideo.video_id}`, videoData)
        .then(response => {
          toast.success("Video updated successfully");
          handleRefresh()
        })
        .catch(error => {
          console.error("Error updating video:", error);
          toast.error("Failed to update video");
          handleRefresh()
          
        });
    } else {
      // Add new video
      axios.post("http://localhost:4000/videos", videoData)
        .then((res) => {
          console.log("Video added:", res.data);
          toast.success("Video added successfully!");
        })
        .catch((error) => {
          console.error("Error adding video:", error);
          toast.error("Failed to add video. Please try again.");
        });
    }

    setIsAddModalOpen(false);                                
    setSelectedVideo(undefined);
     setActiveTab("videos");   
     
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:4000/categories");
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Failed to load categories", error);
      }
    };

    fetchCategories();
  }, [refresh]);

  return (
    <>
      <div className="h-screen w-screen lg:p-4 md:p-4 sm:p-0  bg-hero-gradient overflow-auto">
        <header className="sticky top-0 w-full p-3 border-1 border-white rounded-lg font-inter shadow-lg bg-white z-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-500 drop-shadow-lg font-poppins mb-2">
              Admin Dashboard
            </h1>
          </div>

          <div className="mt-6">
            <Navbar
              activeTab={activeTab}
              setActiveTab={handleTabChange}
              handleSignOut={handleSignOut}
            />
          </div>
        </header>

        <div className="text-center flext justify-center item-center">
          {activeTab === "videos" && (
            <ManageVideos
              onEdit={(video: Video) => {
                setSelectedVideo(video);
                setIsAddModalOpen(true);
              } 
             }
              refreshFlag = {refresh}
              
            />
          )}
          {activeTab === "users" && <ManageUsers />}
          {activeTab === "categories" && <ManageCategories />}
        </div>
      </div>

      <AddVideoModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddVideoSubmit}
        categories={categories}
        initialData={selectedVideo}
      />
    </>
  );
}

export default AdminDashboard;
