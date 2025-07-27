import express from "express";
import CategoryRoutes from "./routes/categoryRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-netlify-site.netlify.app'],
  credentials: true,
}));

app.use("/categories",CategoryRoutes);
app.use("/videos",videoRoutes);
app.use("/users",userRoutes);
app.use("/admin",adminRoutes);
app.get("/",(req,res)=>{
   res.send("Api is running")
});
     
 
export default app;