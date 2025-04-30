import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({

    blog_title : {
        type : String
    },

    blog_description : {
        type : String
    },

    blog_image : {
        type : String
    }

},{timestamps : true})


const Blog = mongoose.model("Blog", blogSchema)

export default Blog