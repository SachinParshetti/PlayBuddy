import adminService from "../services/adminServices.js";
import {Request,Response} from "express";

const adminController = {
    createAdmin: async (req:Request,res:Response) => {
        const {admin_id,admin_password} = req.body;
        const result = await adminService.createAdmin(admin_id,admin_password);
        res.status(result.status).json(result.data);
    },
    loginAdmin: async (req:Request,res:Response) => {
        const {admin_id,admin_password} = req.body;
        const result = await adminService.loginAdmin(admin_id,admin_password);
        res.status(result.status).json(result.data);
    },  
    getAllAdmins: async (req:Request,res:Response) => {
        const result = await adminService.getAllAdmins();
        res.status(result.status).json(result.data);
    },
    getAdmin: async (req:Request,res:Response) => {
        const {admin_id} = req.params;
        const result = await adminService.getAdmin(admin_id);
        res.status(result.status).json(result.data);
    },
    updateAdmin: async (req:Request,res:Response) => {
        const {admin_id} = req.params;
        const {admin_password} = req.body;
        const result = await adminService.updateAdmin(admin_id,admin_password);
        if(result.status === 400)
        {
            res.status(400).json({error:result.data.error});
        }
        else
        {
            res.status(200).json(result.data);
        }
    },
    deleteAdmin: async (req:Request,res:Response) => {
        const {admin_id} = req.params;
        const result = await adminService.deleteAdmin(admin_id);
        res.status(result.status).json(result.data);
    }
    
}
export default adminController;