import express from "express";
import userController from "../controllers/userController.js";

const Userrouter = express.Router();

Userrouter.post("/",userController.register);
Userrouter.post("/login",userController.login);
Userrouter.get("/",userController.getAllUsers);
Userrouter.get("/:id",userController.getUser)

Userrouter.put("/:id",userController.updateUser)
Userrouter.delete("/:id",userController.deleteUser)

 

export default Userrouter;


