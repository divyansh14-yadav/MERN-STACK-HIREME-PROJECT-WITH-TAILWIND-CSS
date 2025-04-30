import TaskCategory from "../../../models/Task-M/TaskCategory/task-category-schema.js";


export const createTaskCategory = async (req, res) => {

    try {
        const { task_category_title, task_category_description } = req.body

        const taskCategoryLogo = req.file ? req.file.filename : null


        const checkTaskCategory = await TaskCategory.findOne({ task_category_title })

        if (checkTaskCategory) {
            return res.status(400).json({
                message: "already have this category of task"
            })
        }

        const newTaskCategory = new TaskCategory({
            task_category_title, task_category_description, taskCategoryLogo
        })

        await newTaskCategory.save()

        res.status(200).json({
            message: "created a new task category"
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


export const showAllTaskCategory = async (req, res) => {

    try {
        
        const checkTaskCategory = await TaskCategory.find({}) 

        if (checkTaskCategory.length > 0) {
            // const filteredTaskCategories = checkTaskCategory.filter(category => category.taskCategoryLogo !== null);

            res.status(200).json({
                message: "all task category",
                taskCategory: checkTaskCategory
            })
        }

        else {
            res.status(404).json({
                message: "not found task category"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}