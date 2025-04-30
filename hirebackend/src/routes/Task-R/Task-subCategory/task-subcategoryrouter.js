import express from "express"
import { auth_according_task, category_according_task, createTaskSubCategory, deleteTask, found_single_task, getAllTask, getAllTaskRunning, popular_review_rating_task, review_and_rating_task, search_task_by_title, searchTasks, updateTask } from "../../../controllers/Task-C/taskSubCategory/taskSubcateController.js";
import { upload } from "../../../common/image.js";


const taskSubcategoryRouter = express.Router()

taskSubcategoryRouter.post("/createTask/:authId",upload.single("task_logo"), createTaskSubCategory)

taskSubcategoryRouter.get("/all-popular-task", getAllTask)

taskSubcategoryRouter.get("/task-category-basis/:taskCategoryId", category_according_task)

taskSubcategoryRouter.get("/task-auth-according/:authId", auth_according_task) 

taskSubcategoryRouter.get("/searchTask", searchTasks)

taskSubcategoryRouter.get("/singleTask/:taskId", found_single_task)

taskSubcategoryRouter.put("/update-task/:taskId",upload.single("task_logo"), updateTask)

taskSubcategoryRouter.delete("/delete-task/:taskId", deleteTask)

taskSubcategoryRouter.post("/review-rating-task/:userId/:taskId", review_and_rating_task)

taskSubcategoryRouter.get("/popular-rating-task", popular_review_rating_task)


taskSubcategoryRouter.get("/search-on-tasks", search_task_by_title)


taskSubcategoryRouter.get("/running/:userID", getAllTaskRunning)




export default taskSubcategoryRouter