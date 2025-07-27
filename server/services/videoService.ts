import { Request, Response } from "express";
import Video from "../models/Video.js";
import mongoose from "mongoose";

const videoService = {
  //  Create video
  createVideo: async (req: Request, res: Response) => {
    try {
      const { video_id, title, description, url, likes, views, category_id } = req.body;
      const video = new Video({ video_id, title, description, url, likes, views, category_id });
      await video.save();
      return { status: 201, data: { message: "Video created successfully", video } };
    } catch (error) {
      return { status: 500, data: { error: "Failed to create video" } };
    }
  },

  //  Get all videos
  getVideos: async (req: Request, res: Response) => {
    try {
      const videos = await Video.find();
      return { status: 200, data: { videos } };
    } catch (error) {
      return { status: 500, data: { error: "Internal error" } };
    }
  },

  //  Get video by ID
  getVideo: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const video = await Video.findOne({video_id:Number(id)});

      if (!video) {
        return { status: 404, data: { error: "Video not found" } };
      }

      return { status: 200, data: { video } };
    } catch (error) {
      return { status: 500, data: { error: "Internal server error" } };
    }
  },

  //  Get videos by category
  getVideoByCategory: async (req: Request, res: Response) => {
    try {
      const { category } = req.params;

      const videos = await Video.find({ category_name: category });

      if (!videos || videos.length === 0) {
        return { status: 404, data: { message: "No videos found in this category" } };
      }

      return { status: 200, data: { videos } };
    } catch (error) {
      return { status: 500, data: { error: "Internal server error" } };
    }
  },

  // 5. Update video
  updateVideo: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { video_id, title, description, url, likes, views, category_id } = req.body;

      if (!video_id || !title || !description || !url || !likes || !views || !category_id ) {
        return { status: 400, data: { error: "All fields are required" } };
      }

      const updated = await Video.findOneAndUpdate(
        
          {video_id:Number(id)},
             
        { video_id, title, description, url, likes, views, category_id },
        { new: true } 
        
      );

      if (!updated) {
        return { status: 404, data: { error: "Video not found" } };
      }

      return { status: 200, data: { message: "Video updated successfully", video: updated } };
    } catch (error) {
      return { status: 500, data: { error: "Internal server error" } };
    }
  },

  // For Delete video
  deleteVideo: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const deleted = await Video.findOneAndDelete({video_id:Number(id)}); 

      if (!deleted) {
        return { status: 404, data: { error: "Video not found" } };
      }

      return { status: 200, data: { message: "Video deleted successfully" } };
    } catch (error) {
      return { status: 500, data: { error: "Internal server error" } };
    }
  },
};

export default videoService;
