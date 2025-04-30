import express from "express"
import { createBlog, get_single_blog, getAll_Blog } from "../../controllers/Blog-C/blog-controller.js"
import { upload } from "../../common/image.js"

const blogRouter = express.Router()

blogRouter.post("/uploadBlog",upload.single("BlogPoster"), createBlog)

blogRouter.get("/single-blog/:blogId", get_single_blog)

blogRouter.get("/all_blog_details", getAll_Blog)

export default blogRouter