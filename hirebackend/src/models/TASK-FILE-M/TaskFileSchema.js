import mongoose from "mongoose";


const taskfileSchema = new mongoose.Schema({

    uploadFiles: {
        type: String
    },

    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TaskSubcategory"
    },

    loginAuthId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },


    taskCreatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    }


}, { timestamps: true })


const TaskFile = mongoose.model("File", taskfileSchema)

export default TaskFile