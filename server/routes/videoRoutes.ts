import { Router } from "express";
import videoController from "../controllers/videoController.js";

const videoRoutes = Router();

videoRoutes.post("/", videoController.createVideo);
videoRoutes.get("/", videoController.getVideos);
videoRoutes.get("/:id", videoController.getVideo);
videoRoutes.put("/:id", videoController.updateVideo);
videoRoutes.delete("/:id", videoController.deleteVideo);

export default videoRoutes;


