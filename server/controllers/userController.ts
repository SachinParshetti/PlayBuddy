import { Request, Response } from "express";
import userService from "../services/userService.js";

const userController = {
  register: async (req: Request, res: Response) => {
    try {
      const result = await userService.registerUser(req, res);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const result = await userService.loginUser(req, res);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getAllUsers: async (req: Request, res: Response) => {
    try {
      const result = await userService.getAllUsers(req, res);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getUser: async (req: Request, res: Response) => {
    try {
      const result = await userService.getUser(req, res);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const result = await userService.updateUser(req, res);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const result = await userService.deleteUser(req, res);
      res.status(result.status).json(result.data);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

export default userController;
