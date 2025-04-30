import mongoose from "mongoose";

const taskCategorySchema = new mongoose.Schema({

    taskCategoryLogo : {
        type : String
    },

    task_category_title : {
        type : String
    },

    task_category_description : {
        type : String
    }

},{timestamps : true})


const TaskCategory = mongoose.model("taskCategory", taskCategorySchema)

export default TaskCategory