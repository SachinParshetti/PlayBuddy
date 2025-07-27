import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    admin_id:{
        type:String,
        required:true,
        unique:true,
    },
    admin_password:{
        type:String,
        required:true,
    }
})

const Admin = mongoose.model("Admin",adminSchema);
export default Admin;