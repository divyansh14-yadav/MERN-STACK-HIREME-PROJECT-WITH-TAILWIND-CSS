import Auth from "../../../models/Auth-M/authModel.js";
import BidTask from "../../../models/Bid-Task-M/bidTaskSchema.js";
import TaskSubcategory from "../../../models/Task-M/Task-subcategory/task-subcategory-schema.js";


// create task
export const createTaskSubCategory = async (req, res) => {

    try {
        const { authId } = req.params

        const { taskCategoryId, taskTitle, taskDescription, taskVerify, task_Skill_Required, location, Task_Max_Budget, Task_Min_Budget, fixed_Task_type } = req.body

        const task_logo = req.file ? req.file.filename : null

        const checkAuth = await Auth.findOne({ _id: authId })

        if (!checkAuth) {
            return res.status(400).json({
                message: "firstly you register"
            })
        }

        const checkTask = await TaskSubcategory.findOne({ taskTitle })

        if (checkTask) {
            return res.status(400).json({
                message: "already have this task",
            })
        }

        const newTask = new TaskSubcategory({
            authId, taskCategoryId, taskTitle, taskDescription, task_logo, taskVerify, task_Skill_Required, location, Task_Max_Budget, Task_Min_Budget, fixed_Task_type
        })

        await newTask.save()

        res.status(200).json({
            message: "task created successfully",
            newTask: newTask
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error
        })
    }
}



// all task get
export const getAllTask = async (req, res) => {

    try {
        const checkTask = await TaskSubcategory.find({}).populate({
            path: "authId",
            select: "firstName"
        })
            .populate({
                path: "taskCategoryId",
                select: "task_category_title"
            })

        if (checkTask.length > 0) {
            res.status(200).json({
                message: "all task are",
                popularTask: checkTask
            })
        }

        else {
            res.status(404).json({
                message: "not found any task"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}



// category according get task
export const category_according_task = async (req, res) => {

    try {
        const { taskCategoryId } = req.params

        const checkTask = await TaskSubcategory.find({ taskCategoryId }).populate({
            path: "authId",
            select: "firstName"
        })
            .populate({
                path: "taskCategoryId",
                select: "task_category_title"
            })

        if (checkTask) {
            res.status(200).json({
                message: "category according task",
                task_category_basis: checkTask
            })
        }

        else {
            res.status(404).json({
                message: "not found task in this category"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


// user according task get

export const auth_according_task = async (req, res) => {

    try {
        const { authId } = req.params

        const checkTask = await TaskSubcategory.find({ authId }).populate({
            path: "authId",
            select: "firstName"
        })
            .populate({
                path: "taskCategoryId",
                select: "task_category_title"
            })


        if (checkTask) {
            res.status(200).json({
                message: "your created task",
                yourCreatedTask: checkTask
            })
        }

        else {
            res.status(404).json({
                message: "not found task"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


// search task
export const searchTasks = async (req, res) => {

    try {
        const { taskTitle, task_Skill_Required, location, newest, oldest } = req.query;

        let searchFilter = {};

        if (taskTitle) {
            searchFilter.taskTitle = { $regex: taskTitle, $options: 'i' };
        }

        if (task_Skill_Required) {
            searchFilter.task_Skill_Required = { $in: task_Skill_Required.split(",") };
        }

        if (location) {
            searchFilter.location = { $regex: location, $options: 'i' };
        }

        let sortOption = {};

        if (newest === "newest") {
            sortOption = { createdAt: -1 };

        } else if (oldest === "oldest") {
            sortOption = { createdAt: 1 };

        } else {
            sortOption = {};
        }


        const tasks = await TaskSubcategory.find(searchFilter)

            .sort(sortOption)
            .populate({
                path: "authId",
                select: "firstName"
            })
            .populate({
                path: "taskCategoryId",
                select: "task_category_title"
            });

        if (tasks.length > 0) {
            res.status(200).json({
                message: "Tasks found based on search criteria",
                tasks: tasks
            });
        } else {
            res.status(404).json({
                message: "No tasks found for the given search criteria"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};






// get the single task
export const found_single_task = async (req, res) => {

    try {

        const { taskId } = req.params

        const checkTask = await TaskSubcategory.findOne({ _id: taskId }).populate({
            path: "authId",
            select: "firstName"
        })
            .populate({
                path: "taskCategoryId",
                select: "task_category_title"
            })

        if (checkTask) {

            // average rating calculate karne ke ley
            let averageRating = 0;
            if (checkTask.ratings && checkTask.ratings.length > 0) {
                const totalRating = checkTask.ratings.reduce((sum, rating) => sum + rating.rating, 0);
                averageRating = totalRating / checkTask.ratings.length;
            }

            res.status(200).json({
                message: "single task",
                singleTask: checkTask,
                averageRating
            })
        }
        else {
            res.status(404).json({
                message: "not found this task"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}


// update a task
export const updateTask = async (req, res) => {

    try {
        const { taskId } = req.params

        const { taskCategoryId, taskTitle, taskDescription, taskVerify, task_Skill_Required, location, Task_Max_Budget, Task_Min_Budget, fixed_Task_type } = req.body


        const existingTask = await TaskSubcategory.findById(taskId)

        if (!existingTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        const task_logo = req.file ? req.file.filename : existingTask.task_logo;


        const checkTask = await TaskSubcategory.findByIdAndUpdate({ _id: taskId }, {

            taskCategoryId, taskTitle, taskDescription, taskVerify, task_Skill_Required, location, Task_Max_Budget, Task_Min_Budget, fixed_Task_type, task_logo

        }, { new: true })

        if (checkTask) {
            res.status(200).json({
                message: "update this task"
            })
        }
        else {
            res.status(404).json({
                message: "not found this task"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}


// delete task
export const deleteTask = async (req, res) => {

    try {

        const { taskId } = req.params

        const checkTask = await TaskSubcategory.findOneAndDelete({ _id: taskId })

        if (checkTask) {
            res.status(200).json({
                message: "delete task"
            })
        }
        else {
            res.status(404).json({
                message: "not found this task"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}



// review and rate by task

export const review_and_rating_task = async (req, res) => {

    try {

        const { userId, taskId } = req.params;
        const { rating, review } = req.body;

        const task = await TaskSubcategory.findOne({ _id: taskId });

        if (!task) {
            return res.status(400).json({
                message: "task not found"
            });
        }

        // check alrady rating and review in same user
        const existingRating = task.ratings.find(r => r.reviewerId.toString() === userId);

        if (existingRating) {
            existingRating.rating = rating;
            existingRating.review = review;
            existingRating.createdAt = new Date()

        } else {
            task.ratings.push({ rating, review, reviewerId: userId });
        }

        await task.save();

        res.status(200).json({
            message: "successfully added or updated",
            task
        });

    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}



export const popular_review_rating_task = async (req, res) => {

    try {
        const task = await TaskSubcategory.find({}).populate('ratings.reviewerId', 'firstName')

        const taskWithAverageRating = task.map(task => {

            let totalStars = 0;
            task.ratings.forEach(rating => {
                totalStars += rating.rating;
            });

            const averageRating = task.ratings.length > 0 ? totalStars / task.ratings.length : 0;

            return {
                ...task.toObject(),
                averageRating
            };
        })

        taskWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);

        res.status(200).send({ task: taskWithAverageRating });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};




export const search_task_by_title = async (req, res) => {

    try {
        const { searchTitle } = req.query;

        if (!searchTitle) {
            return res.status(400).json({
                message: "Please provide a title to search."
            });
        }

        const task = await TaskSubcategory.find({
            taskTitle: { $regex: searchTitle, $options: 'i' }

        })
            .populate({
                path: "authId",
                select: "firstName lastName"
            }).populate({
                path: "taskCategoryId",
                select: "task_category_title"
            })

        const total_of_service = task.length

        if (task.length > 0) {
            res.status(200).json({
                message: "task found.",
                task,
                total_of_service
            });
        } else {
            res.status(404).json({
                message: "No task found with the given title."
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}


export const getAllTaskRunning = async (req, res) => {
    try {
        const { userID } = req.params;

        const tasks = await BidTask.find({ TaskCreaterId: userID }).populate({
            path : "taskId",
            select : "taskTitle"
        }).populate({
            path : "loginAuthId",
            select : "firstName lastName"
        })
        .populate({
            path : "TaskCreaterId",
            select : "firstName lastName"
        })

        const filteredTasks = tasks.filter(task => 
            task.confirmation_bid_user === "Accepted" && task.status === "Alloted"
        );

        const filteredTasks2 = tasks.filter(task => 
            task.confirmation_bid_user === "Rejected" && task.status === "Alloted"
        );

        if (filteredTasks.length > 0) {
            res.status(200).json({
                message: "Alloted tasks with 'Accepted' confirmation are",
                runningTask: filteredTasks,
                rejectedTask : filteredTasks2
            });
        } else {
            res.status(404).json({
                message: "No tasks found with confirmation_bid_user as 'Accepted' and status as 'Alloted'"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};
