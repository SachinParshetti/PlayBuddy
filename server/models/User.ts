import mongoose from "mongoose";
export const user = new mongoose.Schema({
    username: {type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
    mobile: {type:String,required:true},
})

const User = mongoose.model('users',user);
export default User;






