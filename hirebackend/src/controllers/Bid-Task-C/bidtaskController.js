// import Auth from "../../models/Auth-M/authModel.js";
// import BidTask from "../../models/Bid-Task-M/bidTaskSchema.js";
import TaskSubcategory from "../../models/Task-M/Task-subcategory/task-subcategory-schema.js";
// import admin from "firebase-admin"
// import { token } from "morgan";
// import admin from "firebase-admin";


// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// // Resolve __dirname in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load service account manually
// const serviceAccount = JSON.parse(
//   fs.readFileSync(path.join(__dirname, "../../../firebase-service-account.json"))
// );

// if (!admin.apps.length) {
//     admin.initializeApp({
//       credential: admin.credential.cert(serviceAccount)
//     });
//   }


export const createBid = async (req, res) => {

    try {

        const { loginAuthId, taskId } = req.params;

        const { description, minimalRate, deliveryTime, deliveryDays, status, confirmation_bid_user } = req.body;

        const checkTask = await TaskSubcategory.findOne({ _id: taskId });

        if (!checkTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        const existingBid = await BidTask.findOne({ loginAuthId, taskId });

        if (existingBid) {
            const updatedBid = await BidTask.findOneAndUpdate(
                { loginAuthId, taskId },
                { description, minimalRate, deliveryTime, deliveryDays, status, confirmation_bid_user },
                { new: true }
            );

            return res.status(200).json({
                message: "Bid updated successfully",
                bidplace: updatedBid
            });
        }

        const newTaskCreate = new BidTask({
            loginAuthId, taskId, description, minimalRate, deliveryTime, deliveryDays, status, confirmation_bid_user, TaskCreaterId: checkTask.authId //owner of task
        });

        await newTaskCreate.save();

        res.status(200).json({
            message: "Placed bid on task",
            bidplace: newTaskCreate
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};



// get all task my bid according

export const found_all_bid_task = async (req, res) => {

    try {
        const { loginAuthId, taskId } = req.params

        const checkLoginAuth = await BidTask.find({ loginAuthId })

        if (!checkLoginAuth) {
            return res.status(404).json({
                message: "not found this auth profile"
            })
        }

        const allBidTask = await BidTask.find({ taskId })
            .sort({ createdAt: -1 })
            .populate({
                path: "taskId",
                select: "taskTitle"
            }).populate({
                path: "loginAuthId",
                select: "firstName lastName authProfile country"
            }).populate({
                path: "TaskCreaterId",
                select: "firstName"
            })

        if (allBidTask.length > 0) {
            res.status(200).json({
                message: "all found bid task",
                allBidTask: allBidTask
            })
        }

        else {
            res.status(404).json({
                message: "not found any bid task"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}



export const getReciverBid = async (req, res) => {

    try {
        const { loginAuthId, taskId } = req.params;

        const receivedBid = await BidTask.find({
            TaskCreaterId: loginAuthId,
            taskId: taskId
        })
            .sort({ createdAt: -1 })
            .populate({
                path: "taskId",
                select: "taskTitle"
            }).populate({
                path: "loginAuthId",
                select: "firstName"
            }).populate({
                path: "TaskCreaterId",
                select: "firstName"
            })

        res.status(200).json({
            message: "received bid on your task",
            receivedBids: receivedBid
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error
        });
    }
}




// export const updateBidDetails = async (req, res) => {

//     try {
//         const { bidId } = req.params

//         const { status,confirmation_bid_user } = req.body;

//         const updateBidStatus = await BidTask.findOneAndUpdate({ _id: bidId }, {
//             status, confirmation_bid_user
//         }, { new: true })


//         res.status(200).send({
//             message: "update bid status",
//             bidStatus: updateBidStatus
//         })

//     } catch (error) {
//         res.status(500).json({
//             message: "Internal server error"
//         })
//     }
// }



export const found_all_bid_task_list = async (req, res) => {

    try {
        const { loginAuthId } = req.params

        const checkLoginAuth = await BidTask.find({ loginAuthId })

        if (!checkLoginAuth) {
            return res.status(404).json({
                message: "not found this auth profile"
            })
        }

        const allBidTask = await BidTask.find({ loginAuthId })
            .sort({ createdAt: -1 })
            .populate({
                path: "taskId",
                select: "taskTitle"
            }).populate({
                path: "loginAuthId",
                select: "firstName lastName authProfile country"
            }).populate({
                path: "TaskCreaterId",
                select: "firstName"
            })

        if (allBidTask.length > 0) {
            res.status(200).json({
                message: "all found bid task",
                allBidTask: allBidTask
            })
        }

        else {
            res.status(404).json({
                message: "not found any bid task"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
}



// POST /api/save-device-token
export const saveDeviceToken = async (req, res) => {
    const { authId, deviceToken } = req.body;

    try {
        await Auth.findByIdAndUpdate(authId, { deviceToken });
        res.status(200).json({ message: "Token saved successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to save token" });
    }
};



// -------------

import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Auth from "../../models/Auth-M/authModel.js";
import BidTask from "../../models/Bid-Task-M/bidTaskSchema.js";

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Firebase service account key
const serviceAccount = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../../../firebase-service-account.json"), "utf8")
);

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

// Function to send a notification
const sendNotification = async (registrationToken, message) => {
    const messageSend = {
        token: registrationToken,
        notification: {
            title: message.title || "Status Updated",
            body: message.body || "Your bid status has been updated.",
        },
        data: message.data || {},
        android: { priority: "high" },
        apns: { payload: { aps: { badge: 1 } } },
    };

    try {
        const response = await admin.messaging().send(messageSend);
        console.log("✅ Notification sent successfully:", response);
    } catch (error) {
        console.error("❌ Error sending notification:", error);
    }
};

// Update bid and notify user
export const updateBidDetails = async (req, res) => {
    try {
        const { bidId } = req.params;
        const { status, confirmation_bid_user } = req.body;

        const updatedBid = await BidTask.findOneAndUpdate(
            { _id: bidId },
            { status, confirmation_bid_user },
            { new: true }
        );

        if (!updatedBid) {
            return res.status(404).json({ message: "Bid not found" });
        }

        // Step 1: Get FCM token of bidder (loginAuthId)
        const bidder = await Auth.findById(updatedBid.loginAuthId);

        if (!bidder) {
            console.log("❌ Bidder not found!");
        } else {
            console.log("✅ FCM Token:", bidder.fcmToken); // This should now show the token
        }

        const fcmToken = bidder?.fcmToken;



        // Step 2: Send notification if token is found
        if (fcmToken) {
            await sendNotification(fcmToken, {
                title: "🎯 Bid Status Updated",
                body: `Your bid for task has been ${status}`,
                data: {
                    bidId: updatedBid._id.toString(),
                    status: updatedBid.status,
                },
            });
        }

        res.status(200).json({
            message: "✅ Bid status updated",
            bidStatus: updatedBid,
        });
    } catch (error) {
        console.error("❌ Update Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
