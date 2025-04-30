import express from "express"
import { addEducation, changePassword, contactUs, deleteEduction, forgetPassword, getProfile, login, register, resent_otp, reset_password, temp, updateAuth, updateAuthImage, verifyOtp } from "../../controllers/Auth-C/authController.js"
import { upload } from "../../common/image.js"
import { saveDeviceToken } from "../../controllers/Bid-Task-C/bidtaskController.js"


const authRouter = express.Router()

authRouter.post("/temp-register", temp)

authRouter.post("/registerAuth", register)

authRouter.post("/loginAuth", login)

authRouter.post("/change-password/:authId", changePassword)

authRouter.put("/update-profile-auth/:authId",  updateAuth)

authRouter.get("/found-profile/:authId", getProfile)

authRouter.post("/forget-password", forgetPassword)

authRouter.post("/verify-otp", verifyOtp)

authRouter.post("/reset-password", reset_password)

authRouter.post("/resent-otp", resent_otp)

authRouter.post("/addEduction/:authId", addEducation)

authRouter.delete("/deleteEducation/:authId/:educationId", deleteEduction)


authRouter.post("/contactUs", contactUs)

authRouter.patch("/updateAuthProfileImage/:authId",upload.single("authProfile"), updateAuthImage)


authRouter.get("addtoken", saveDeviceToken)

export default authRouter