import { model,Schema } from "mongoose";
import mongoose from "mongoose";

export const videos = new mongoose.Schema({
    video_id: {type:Number,required:true},
    title: {type:String,required:true},
    description: {type:String,required:true},
    url: {type:String,required:true},
    likes: {type:Number,required:true},
    views: {type:Number,required:true},
    category_id: {type:Number,required:true}
   
})

 const Video = mongoose.model('videos',videos);
 export default Video;




