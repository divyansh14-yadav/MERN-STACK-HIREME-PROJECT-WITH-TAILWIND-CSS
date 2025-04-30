import express from "express"
import { createTaskCategory, showAllTaskCategory } from "../../../controllers/Task-C/taskCategory/task-category-controller.js"
import { upload } from "../../../common/image.js"


const taskCategoryRouter = express.Router()

taskCategoryRouter.post("/create-task-category",upload.single("task-category-logo"),  createTaskCategory)

taskCategoryRouter.get("/show-all-task-category", showAllTaskCategory)

export default taskCategoryRouter