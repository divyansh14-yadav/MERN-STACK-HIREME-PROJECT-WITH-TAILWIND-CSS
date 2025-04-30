import express from "express";
import { sendMessage, getMessages, getAllUserChat } from "../../controllers/messageController.js";

const router = express.Router();

router.post("/messages", sendMessage);
router.get("/messages", getMessages);

router.get("/allChat/:authId", getAllUserChat);




export default router;