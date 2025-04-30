import express from "express"
import { createMileStone, createStripeInvoiceForMilestone, deatils_On_Task_MileStone, getUploadedFiles, uploadTaskFiles } from "../../controllers/MileStone-C/mileStoneController.js"
import { upload } from "../../common/image.js"

const mileStoneRouter = express.Router()

mileStoneRouter.post("/create-MileStone/:taskId/:bidId/:loginAuthId",createMileStone)

mileStoneRouter.get("/found-milestone-task/:taskId/:loginAuthId", deatils_On_Task_MileStone)

mileStoneRouter.get("/invoice/:milestoneId", createStripeInvoiceForMilestone)

mileStoneRouter.post("/uploadTaskFile/:loginAuthId/:taskCreatorId",upload.single("uploadFiles"), uploadTaskFiles)

mileStoneRouter.get("/found-upload-files/:loginAuthId/:taskCreatorId", getUploadedFiles)





export default mileStoneRouter