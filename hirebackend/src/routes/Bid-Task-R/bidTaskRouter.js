import express from "express"
import { createBid, found_all_bid_task, found_all_bid_task_list, getReciverBid, updateBidDetails } from "../../controllers/Bid-Task-C/bidtaskController.js"


const bidRouter = express.Router()

bidRouter.post("/createBid/:loginAuthId/:taskId", createBid)

bidRouter.get("/all-bid-task/:loginAuthId/:taskId", found_all_bid_task)

bidRouter.get("/receivedBid/:loginAuthId/:taskId", getReciverBid)

bidRouter.patch("/updateBidStatus/:bidId", updateBidDetails)

bidRouter.get("/all-bid-task-list/:loginAuthId", found_all_bid_task_list)



export default bidRouter