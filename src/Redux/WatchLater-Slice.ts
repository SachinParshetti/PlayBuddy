// Redux/WatchLater-Slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Video {
  _id: string;
  video_id: number;
  title: string;
  description: string;
  url: string;
  views: number;
  likes: number;
  category_id: number;
}

interface WatchLaterState {
  watchLater: { [userId: string]: Video[] };
}

const initialState: WatchLaterState = {
  watchLater: JSON.parse(localStorage.getItem("watchLaterByUser") || "{}"),
};

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState,
  reducers: {
    addToWatchLater: (
      state,
      action: PayloadAction<{ userId: string; video: Video }>
    ) => {
      const { userId, video } = action.payload;
      if (!state.watchLater[userId]) {
        state.watchLater[userId] = [];
      }
      if (!state.watchLater[userId].some((v) => v._id === video._id)) {
        state.watchLater[userId].push(video);
      }
      localStorage.setItem("watchLaterByUser", JSON.stringify(state.watchLater));
    },
    removeFromWatchLater: (
      state,
      action: PayloadAction<{ userId: string; videoId: string }>
    ) => {
      const { userId, videoId } = action.payload;
      if (state.watchLater[userId]) {
        state.watchLater[userId] = state.watchLater[userId].filter(
          (video) => video._id !== videoId
        );
        localStorage.setItem("watchLaterByUser", JSON.stringify(state.watchLater));
      }
    },
  },
});

export const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;
export default watchLaterSlice.reducer;