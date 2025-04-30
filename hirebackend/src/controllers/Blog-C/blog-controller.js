import Blog from "../../models/Blog-M/latest-blog-schema.js";


export const createBlog = async (req, res) => {

    try {
        const { blog_title, blog_description } = req.body

        const blog_image = req.file ? req.file.filename : null


        const checkBlog = await Blog.findOne({ blog_title })

        if (checkBlog) {
            return res.status(400).json({
                message: "already have this blog" 
            })
        }

        const newBlog = new Blog({
            blog_title, blog_description, blog_image
        })

        await newBlog.save()

        res.status(200).json({
            message: "created a new blog"
        })

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


export const get_single_blog = async (req, res) => {

    try {
        const { blogId } = req.params

        const checkBlog = await Blog.findById({ _id: blogId })

        if (checkBlog) {
            res.status(200).json({
                message: "blog...",
                blog: checkBlog
            })
        }

        else {
            res.status(404).json({
                message: "not found this blog"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


export const getAll_Blog = async (req, res) => {

    try {
        const checkDetails = await Blog.find({}).sort({sort : 1}).sort({ createdAt: -1 })

        if (checkDetails.length > 0) {
            res.status(200).json({
                message: "all blogs are...",
                all_blog: checkDetails
            })
        }

        else {
            res.status(404).json({
                message: "not found any blog"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}