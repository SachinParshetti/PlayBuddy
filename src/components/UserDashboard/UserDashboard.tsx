import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Tooltip,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  InputAdornment,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { Drawer } from "@mui/material";
import { Close, Menu, AccountCircle, ThumbDown, ThumbUp, Visibility, Share, WatchLater, Delete, Search } from "@mui/icons-material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { addToWatchLater, removeFromWatchLater } from "../../Redux/WatchLater-Slice";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
const UserDashboard = () => {
  const { logout } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const watchLaterVideos = useSelector((state: RootState) => state.watchLater.watchLater);
  const [user, setUser] = useState<any>();
  const [avatarImg, setAvatarImg] = useState<any>();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // New state for search input
  const [likedVideos, setLikedVideos] = useState<{ [key: string]: boolean }>(() => {
    const userId = localStorage.getItem("userId");
    return userId ? JSON.parse(localStorage.getItem(`likedVideos_${userId}`) || "{}") : {};
  });
  const [dislikedVideos, setDislikedVideos] = useState<{ [key: string]: boolean }>(() => {
    const userId = localStorage.getItem("userId");
    return userId ? JSON.parse(localStorage.getItem(`dislikedVideos_${userId}`) || "{}") : {};
  });
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    const loginType = localStorage.getItem("LoginType");
    if (loginType === "manual") {
      localStorage.removeItem("token");
      localStorage.removeItem("LoginType");
      localStorage.removeItem("userId");
      navigate("/");
    } else {
      localStorage.removeItem("socialUser");
      localStorage.removeItem("LoginType");
      localStorage.removeItem("userId");
      logout({ logoutParams: { returnTo: window.location.origin + "/" } });
    }
    toast.success("Logout successful");
  };

  function UserDetails() {
    const loginType = localStorage.getItem("LoginType");
    let userId: string | undefined;
    if (loginType === "social") {
      const socialUser = JSON.parse(localStorage.getItem("socialUser") || "{}");
      userId = socialUser.sub || socialUser.user_id || socialUser.username;
      setUser(socialUser);
    } else if (loginType === "manual") {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        userId = (decoded as any).id || (decoded as any).user_id || (decoded as any).username;
        setUser(decoded as any);
      } else {
        console.error("No token found for manual login");
        toast.error("Authentication error: No token found");
      }
    } else {
      console.error("Invalid login type:", loginType);
      toast.error("Authentication error: Invalid login type");
    }
    if (userId) {
      localStorage.setItem("userId", userId);
      setLikedVideos(JSON.parse(localStorage.getItem(`likedVideos_${userId}`) || "{}"));
      setDislikedVideos(JSON.parse(localStorage.getItem(`dislikedVideos_${userId}`) || "{}"));
    }
    setIsLoading(false);
  }

  const migrateWatchLaterData = () => {
    const userId = user?.sub || user?.id || user?.user_id || user?.username;
    if (!userId) {
      console.error("No valid user ID for migration:", user);
      return;
    }
    const oldData = localStorage.getItem("watchLater");
    if (oldData) {
      try {
        const oldVideos = JSON.parse(oldData);
        if (Array.isArray(oldVideos)) {
          oldVideos.forEach((video: any) => {
            dispatch(addToWatchLater({ userId, video }));
          });
          localStorage.removeItem("watchLater");
          console.log("Migrated old watch later data for user:", userId);
        }
      } catch (error) {
        console.error("Error migrating watch later data:", error);
        toast.error("Failed to migrate watch later data");
      }
    }
  };

  async function showVideos() {
    setIsLoading(true);
    try {
      const response: any = await axios.get("http://localhost:4000/videos");
      if (response.status === 200) {
        setVideos(response.data.videos);
        const initialLikeCounts: { [key: string]: number } = {};
        response.data.videos.forEach((video: any) => {
          initialLikeCounts[video._id] = video.likes || 0;
        });
        setLikeCounts(initialLikeCounts);
      } else {
        toast.error("Failed to fetch videos");
      }
    } catch (error) {
      console.error('Error Fetching videos:', error);
      toast.error("Something went wrong while fetching videos");
    }
    setIsLoading(false);
  }

  const handleLikeToggle = async (video: any) => {
    const userId = user?.sub || user?.id || user?.user_id || user?.username;
    if (!userId) {
      toast.error("Please log in again to like videos");
      return;
    }
    const isLiked = likedVideos[video._id];
    const isDisliked = dislikedVideos[video._id];
    let newLikeCount = likeCounts[video._id] ?? video.likes;

    if (isLiked) {
      newLikeCount = Math.max(newLikeCount - 1, 0);
      setLikedVideos(prev => {
        const newLiked = { ...prev, [video._id]: false };
        localStorage.setItem(`likedVideos_${userId}`, JSON.stringify(newLiked));
        return newLiked;
      });
    } else {
      newLikeCount = isDisliked ? newLikeCount + 1 : newLikeCount + 1;
      setLikedVideos(prev => {
        const newLiked = { ...prev, [video._id]: true };
        localStorage.setItem(`likedVideos_${userId}`, JSON.stringify(newLiked));
        return newLiked;
      });
      setDislikedVideos(prev => {
        const newDisliked = { ...prev, [video._id]: false };
        localStorage.setItem(`dislikedVideos_${userId}`, JSON.stringify(newDisliked));
        return newDisliked;
      });
    }
    setLikeCounts(prev => ({ ...prev, [video._id]: newLikeCount }));

    try {
      await axios.put(`http://localhost:4000/videos/${video.video_id}`, {
        video_id: video.video_id,
        title: video.title,
        description: video.description,
        url: video.url,
        likes: newLikeCount,
        views: video.views,
        category_id: video.category_id
      });
    } catch (error) {
      console.error("Error updating like count:", error);
      setLikedVideos(prev => ({ ...prev, [video._id]: isLiked }));
      setDislikedVideos(prev => ({ ...prev, [video._id]: isDisliked }));
      setLikeCounts(prev => ({ ...prev, [video._id]: likeCounts[video._id] ?? video.likes }));
      toast.error("Failed to update like status");
    }
  };

  const handleDislikeToggle = (video: any) => {
    const userId = user?.sub || user?.id || user?.user_id || user?.username;
    if (!userId) {
      toast.error("Please log in again to dislike videos");
      return;
    }
    const isLiked = likedVideos[video._id];
    const isDisliked = dislikedVideos[video._id];
    let newLikeCount = likeCounts[video._id] ?? video.likes;

    if (isDisliked) {
      setDislikedVideos(prev => {
        const newDisliked = { ...prev, [video._id]: false };
        localStorage.setItem(`dislikedVideos_${userId}`, JSON.stringify(newDisliked));
        return newDisliked;
      });
    } else {
      if (isLiked) {
        newLikeCount = Math.max(newLikeCount - 1, 0);
        setLikedVideos(prev => {
          const newLiked = { ...prev, [video._id]: false };
          localStorage.setItem(`likedVideos_${userId}`, JSON.stringify(newLiked));
          return newLiked;
        });
        try {
          axios.put(`http://localhost:4000/videos/${video.video_id}`, {
            video_id: video.video_id,
            title: video.title,
            description: video.description,
            url: video.url,
            likes: newLikeCount,
            views: video.views,
            category_id: video.category_id
          });
        } catch (error) {
          setLikedVideos(prev => ({ ...prev, [video._id]: true }));
          setLikeCounts(prev => ({ ...prev, [video._id]: likeCounts[video._id] ?? video.likes }));
          toast.error("Failed to update like status");
        }
      }
      setDislikedVideos(prev => {
        const newDisliked = { ...prev, [video._id]: true };
        localStorage.setItem(`dislikedVideos_${userId}`, JSON.stringify(newDisliked));
        return newDisliked;
      });
      setLikeCounts(prev => ({ ...prev, [video._id]: newLikeCount }));
    }
  };

  const handleWatchLaterToggle = (video: any) => {
    const userId = user?.sub || user?.id || user?.user_id || user?.username;
    if (!userId) {
      toast.error("Please log in again to use Watch Later");
      return;
    }
    const userWatchLaterVideos = watchLaterVideos[userId] || [];
    const isInWatchLater = userWatchLaterVideos.some((v: any) => v._id === video._id);
    if (isInWatchLater) {
      dispatch(removeFromWatchLater({ userId, videoId: video._id }));
      toast.success("Removed from Watch Later");
    } else {
      dispatch(addToWatchLater({ userId, video }));
      toast.success("Added to Watch Later");
    }
  };

  // Filter videos based on search query
  const filteredVideos = videos.filter(video =>
    video.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    UserDetails();
    showVideos();
  }, []);

  useEffect(() => {
    let loginType = localStorage.getItem("LoginType");
    if (loginType === "social") {
      const socialUser = JSON.parse(localStorage.getItem("socialUser") || "{}");
      const avatarUrl = socialUser.picture;
      if (avatarUrl) {
        setAvatarImg(avatarUrl);
      }
    }
    if (user?.sub || user?.id || user?.user_id || user?.username) {
      migrateWatchLaterData();
    }
  }, [user]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><img src="images/loading-load.gif" alt=" loading../" height={100} width={100} /></div>;
  }

  const userId = user?.sub || user?.id || user?.user_id || user?.username;
  const userWatchLaterVideos = watchLaterVideos[userId] || [];

  return (
    <>
      <div className="h-screen w-screen bg-hero-gradient overflow-auto">
        <header className="sticky top-0 w-full text-center p-2 bg-hero-gradient rounded-lg font-inter shadow-lg z-10">
          <div>
            <h1 className="text-3xl text-start md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500 drop-shadow-lg font-poppins mb-4">
              User Dashboard
            </h1>
          </div>
          <div className="flex justify-between p-4 items-center">
            <div className="flex items-center gap-2">
              <Avatar
                src={avatarImg}
                imgProps={{ referrerPolicy: "no-referrer" }}
                sx={{
                  width: 40,
                  height: 40,
                  fontSize: 24,
                  backgroundColor: "#3b82f6",
                  color: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
                className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 shadow-lg hover:scale-105 hover:to-blue-500 ms-0"
                alt={`${user?.name || user?.username || 'User'} avatar`}
              >
                {user?.name ? user.name.charAt(0).toUpperCase() :
                  user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
              </Avatar>
              <span className="text-lg font-bold text-black">{user?.name || user?.username || 'User'}</span>
            </div>
           
            <div>
              <button className="px-4 py-1 rounded-lg bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 shadow-lg hover:scale-105 hover:to-blue-500" onClick={toggleDrawer(true)}>
                <Menu className="text-white" />
              </button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)} sx={{ backgroundColor: "transparent" }}>
                <div className="md:w-md sm:w-full bg-gradient-to-b from-sky-100 via-blue-100 to-indigo-100 h-full">
                  <Box sx={{ padding: 1, borderBottom: '1px solid #ccc' }}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Avatar
                          src={avatarImg}
                          sx={{
                            width: 40,
                            height: 40,
                            fontSize: 24,
                          }}
                          className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 shadow-lg hover:scale-105 hover:to-blue-500"
                          alt={`${user?.name || user?.username || 'User'} avatar`}
                        >
                          {user?.name ? user.name.charAt(0).toUpperCase() :
                            user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
                        </Avatar>
                        <span className="text-lg font-bold text-black">{user?.name || user?.username || 'User'}</span>
                      </div>
                      <Button variant="text" onClick={handleLogout} className="font-poppins font-bold text-shadow-3xl">
                        <ExitToAppIcon/>
                      </Button>
                    </div>
                  </Box>
                  <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: 2, height: "80vh" }}>
                    <Typography variant="h6" fontWeight="bold" textAlign="center">
                      <div className="flex items-center gap-2">
                        <hr className="border-t flex flex-grow border-black" />
                        <span>Watch Later</span>
                        <hr className="border-t flex flex-grow border-black" />
                      </div>
                    </Typography>
                    {userWatchLaterVideos.length === 0 ? (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: "center" }}>
                        No videos in Watch Later
                      </Typography>
                    ) : (
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>Video</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
                            <TableCell align="right" sx={{ fontWeight: "bold" }}>Remove</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {userWatchLaterVideos.map((video: any) => (
                            <TableRow key={video._id}>
                              <TableCell>
                                <Box
                                  onClick={() => window.open(video.url, "_blank")}
                                  sx={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    border: "2px solid #ddd",
                                  }}
                                >
                                  <iframe
                                    src={video.url}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    frameBorder="0"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      border: "none",
                                    }}
                                  />
                                </Box>
                              </TableCell>
                              <TableCell>
                                <Typography noWrap>{video.title || "Untitled"}</Typography>
                              </TableCell>
                              <TableCell align="right">
                                <Tooltip title="Remove from Watch Later">
                                  <IconButton onClick={() => {
                                    dispatch(removeFromWatchLater({ userId, videoId: video._id }));
                                    toast.success("Removed from Watch Later");
                                  }}>
                                    <Delete />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </Box>
                  <Box sx={{ padding: 2, borderTop: '1px solid #ccc' }}>
                    <Button variant="contained" fullWidth onClick={toggleDrawer(false)}>
                      Close Drawer
                    </Button>
                  </Box>
                </div>
              </Drawer>
            </div>
          </div>
           <div>
            <Box sx={{ maxWidth: 600, px:1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search videos by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: "20px",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                  },
                },
              }}
              sx={{ mb: 2 }}
            />
          </Box>
            </div>
        </header>
        <section>
         
          <div className="mt-10 p-4 flex justify-center items-center flex-wrap gap-4">
            {isLoading ? (
             <div className="flex justify-center items-center h-screen"><img src="images/loading-load.gif" alt=" loading../" height={100} width={100} /></div>
            ) : filteredVideos.length === 0 ? (
              <Typography variant="h6" color="text.secondary">
                No videos found
              </Typography>
            ) : (
              filteredVideos.map((video: any) => (
                <Card
                  key={video._id || video.id}
                  sx={{
                    width: 400,
                    maxWidth: '100%',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    borderRadius: 3,
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                >
                  {video.url ? (
                    <CardMedia
                      component="iframe"
                      height="250"
                      src={video.url}
                      title={video.title || 'Video'}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      sx={{ border: 'none', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 250,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'grey.100',
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        No video available
                      </Typography>
                    </Box>
                  )}
                  <CardContent sx={{ p: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {video.description || 'Untitled'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {video.title || 'No title available'}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Like">
                          <IconButton
                            size="small"
                            color={likedVideos[video._id] ? "primary" : "default"}
                            onClick={() => handleLikeToggle(video)}
                          >
                            <ThumbUp fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Dislike">
                          <IconButton
                            size="small"
                            sx={{ color: dislikedVideos[video._id] ? 'red' : 'gray' }}
                            onClick={() => handleDislikeToggle(video)}
                          >
                            <ThumbDown fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={userWatchLaterVideos.some((v: any) => v._id === video._id) ? "Remove from Watch Later" : "Add to Watch Later"}>
                          <IconButton
                            size="small"
                            color={userWatchLaterVideos.some((v: any) => v._id === video._id) ? "primary" : "default"}
                            onClick={() => handleWatchLaterToggle(video)}
                          >
                            <WatchLater fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Share">
                          <IconButton
                            size="small"
                            onClick={() => navigator.clipboard.writeText(video.url || window.location.href)}
                          >
                            <Share fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Visibility fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          Views: {video.views || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Likes: {likeCounts[video._id] ?? video.likes}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default UserDashboard;