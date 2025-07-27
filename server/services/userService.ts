import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

 const userService = {
    registerUser: async (req:Request,res:Response)=>{
        const {username,email,password,mobile} = req.body;
        const existingUser = await User.findOne({username});
        if(existingUser)
        {
            return {status:400,data:{error:"User already exists"}}
        }
        
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({username,email,password:hashedPassword,mobile});
        await newUser.save();
        return {status:201,data:{message:"User created successfully",user:newUser}}
    },
    loginUser: async (req:Request,res:Response)=>{
        const {username,password} = req.body;
        const user = await User.findOne({username});
        if(user)
        {
            const isPasswordCorrect = await bcrypt.compare(password,user.password);
            if(isPasswordCorrect)
            {
                const token = jwt.sign({username:user.username,email:user.email},process.env.JWT_SECRET as string,{expiresIn:"1h"});
                return {status:200,data:{message:"Login successful",token}}
            }
            else{
                return {status:400,data:{error:"Invalid password"}}
            }
        }
        else{
            return {status:400,data:{error:"User not found"}}
        }
    },

    getAllUsers: async (req:Request,res:Response)=>{
       try
       {
        const users = await User.find();
        return {status:200,data:{users}}
       }
       catch(error)
       {
         return {status:500,data:{error:"Internal server error"}}
       }
    },

    getUser: async (req:Request,res:Response)=>{
        try{
            const {id} = req.params;
            const user = await User.findById({_id:id})
            if(!user)
            {
                return {status:404,data:{error:"User not found"}}
            }
            return {status:200,data:{user}}
        }
        catch(error)
        {
            return {status:500,data:{error:"Internal server error"}}
        }
    },

    updateUser: async (req:Request,res:Response)=>{
    try
    {
        const {id} = req.params;
        const {username,email,mobile} = req.body;
        await User.findByIdAndUpdate({_id:id},{username,email,mobile})
        return{status:200,data:{message:"User updated successfully"}}
    } 
    catch(error)
    {
        return {status:500,data:{error:"Internal server error"}}
    }
       
    },

    deleteUser: async (req:Request,res:Response)=>{
       try
       {
        const {id} = req.params;
        await User.findByIdAndDelete({_id:id})
        return{status:200,data:{message:"User deleted successfully"}}
       }
       catch(error)
       {
        return {status:500,data:{error:"Internal server error"}}
       }
    }

 }

 export default userService;