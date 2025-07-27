import mongoose from 'mongoose';
import { Request, Response } from 'express';
import videoService from '../services/videoService.js';
import { request } from 'http';

const videoController =
{
    createVideo: async (req: Request, res: Response) => {
        try {
            const result = await videoService.createVideo(req, res);
            res.status(result.status).json(result.data);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ error: "Failed to create video due to internal error" })
        }
    },

    getVideos: async (req: Request, res: Response) => {
        try {
            const result = await videoService.getVideos(req, res);
            res.status(result.status).json(result.data);
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ error: "Failed to get videos" })
        }
    },
    getVideo: async (req: Request, res: Response) => {
        try {
            const result = await videoService.getVideo(req, res);
            res.status(result.status).json(result.data)
        }
        catch (error) {
            res.status(500).json({ error: "Failed to get videos" })
        }
    },

    getVideoByCategory: async (req: Request, res: Response) => {
        try
        {
            const result = await videoService.getVideoByCategory(req, res);
            res.status(result.status).json(result.data)
        }
        catch(error)
        {
            res.status(500).json({error:"Failed to get video by category name"})
        }
  },
  updateVideo: async (req:Request,res:Response) =>
  {
       try
       {
        const result = await videoService.updateVideo(req,res);
        res.status(result.status).json(result.data)
       }
       catch(error)
       {
         res.status(500).json({error:"failed to updated video"})
       }
  },
  deleteVideo: async  (req:Request,res:Response) =>
  {
      try
      {
        const result = await videoService.deleteVideo(req,res)
        res.status(result.status).json(result.data)
      }
      catch(error)
      {
        res.status(500).json({error:"faild to delete video"})
      }
  }


}

export default videoController;



