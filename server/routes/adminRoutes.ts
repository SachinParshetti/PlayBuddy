import {Router} from "express";
import adminController from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const adminRoutes = Router();

adminRoutes.post("/",adminController.createAdmin);
adminRoutes.post("/login",adminController.loginAdmin);
adminRoutes.get("/", adminController.getAllAdmins);
adminRoutes.get("/:admin_id", adminController.getAdmin);
adminRoutes.put("/:admin_id", adminController.updateAdmin);
adminRoutes.delete("/:admin_id", adminController.deleteAdmin);

export default adminRoutes;