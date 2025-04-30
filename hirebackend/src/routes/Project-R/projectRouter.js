import express from "express"
import { createProject, deleteQuoteMessages, deleteUplodedFiles, fetchDeshboardDetails, found_allProjects, found_service_quote, getReceivedQuotes, updateProject, updateServiceQuote } from "../../controllers/Project-C/projectController.js"
import { upload } from "../../common/image.js"

const projectRouter = express.Router()


projectRouter.post("/createProject/:authId/:serviceId", createProject)

projectRouter.get("/service-quote/:projectId", found_service_quote)

projectRouter.put("/updated-quote/:projectId/:authId", upload.array("quotefileName", 5), updateServiceQuote)

projectRouter.delete("/delete-message/:authId/:messageId", deleteQuoteMessages)

projectRouter.delete("/delete-upload-file/:authId/:uploadFileId", deleteUplodedFiles)

projectRouter.get("/deshboard-details/:authId", fetchDeshboardDetails)

projectRouter.post("/:authId/:serviceId", createProject);

projectRouter.get("/all-found-projects/:authId", found_allProjects)

projectRouter.get("/received/:authId", getReceivedQuotes);

projectRouter.put("/updateproject/:projectId", updateProject)



export default projectRouter