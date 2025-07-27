import Admin from "../models/admin.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

interface IAdminInput {
    admin_id:string;
    admin_password:string;
}


    
const adminService = {
    createAdmin: async (admin_id:string,admin_password:string) => {
        const existingAdmin = await Admin.findOne({admin_id});
        if(existingAdmin)
        {
            return {status:400,data:{error:"Admin already exists"}}

        }
        const admin = new Admin({
            admin_id,
            admin_password
        })
        await admin.save();
        return {status:201,data:{message:"Admin created successfully"}}
},
loginAdmin: async (admin_id:string,admin_password:string) =>
{
    const admin = await Admin.findOne({admin_id});
    if(!admin)
    {
        return {status:400,data:{error:"Admin not found"}}
    }

    const isPasswordCorrect = admin_password === admin.admin_password;
    if(isPasswordCorrect)
    { 
        const token = jwt.sign({admin_id:admin.admin_id},process.env.JWT_SECRET as string,{expiresIn:"1h"});
        return {status:200,data:{message:"Login successful",token}}

    }
    else{
        return {status:400,data:{error:"Invalid password"}}
    }

},
getAllAdmins: async () => {
    const admins = await Admin.find();
    if(!admins)
    {
        return{status:400,data:{error:"No admins found"}}
    }
    else
    {
        return{status:200,data:{admins}}
    }
},
getAdmin: async (admin_id:string) => {
    const admin = await Admin.findOne({admin_id});
    if(!admin)
    {
        return {status:400,data:{error:"Admin not found"}}
    }
    return {status:200,data:{admin}}
},
updateAdmin: async (admin_id:string,admin_password:string) => {
    const admin = await Admin.findOne({admin_id});
    if(!admin)
    {
        return {status:400,data:{error:"Admin not found"}}
    }
    admin.admin_password = admin_password;
    await admin.save();
    return {status:200,data:{message:"Admin updated successfully"}}
},
deleteAdmin: async (admin_id:string) => {
    const admin = await Admin.findOneAndDelete({admin_id:admin_id});
    if(!admin)
    {
        return {status:400,data:{error:`Admin not found \\n Failed to delete`}}
    }
    return {status:200,data:{message:"Admin deleted successfully"}}
}

}
export default adminService;