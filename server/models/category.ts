import mongoose from "mongoose";

export const category = new mongoose.Schema({
    category_id: {type:Number,required:true},
    category_name: {type:String,required:true},
})

const Category = mongoose.model('categories',category);
export default Category;

