import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./src/routes/AuthR/authRouter.js";
import featuredCategoriesRouter from "./src/routes/feature-categories-R/featured-category-router.js";
import featureSubCategoriesRouter from "./src/routes/feature-categories-R/featured-sub-categories-router.js";
import blogRouter from "./src/routes/Blog-R/blog-roluter.js";
import homeRouter from "./src/routes/Home-R/common-router.js";
import serviceRouter from "./src/routes/Service-R/service-router.js";
import taskCategoryRouter from "./src/routes/Task-R/task-category/task-category-router.js";
import taskSubcategoryRouter from "./src/routes/Task-R/Task-subCategory/task-subcategoryrouter.js";
import portfolioRouter from "./src/routes/Portfolio-R/portfolioRouter.js";
import bidRouter from "./src/routes/Bid-Task-R/bidTaskRouter.js";
import projectRouter from "./src/routes/Project-R/projectRouter.js";
import depositRouter from "./src/routes/Deposit-R/depositRouter.js";
import mileStoneRouter from "./src/routes/MileStone-R/mileStoneRouter.js";
import messageRouter from "./src/routes/messageRouter.js";
import Message from "./models/Message.js";

dotenv.config();
const app = express();
connectDb();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", authRouter);
app.use("/api/v1", featuredCategoriesRouter);
app.use("/api/v1", featureSubCategoriesRouter);
app.use("/api/v1", blogRouter);
app.use("/api/v1", homeRouter);
app.use("/api/v1", serviceRouter);
app.use("/api/v1", taskCategoryRouter);
app.use("/api/v1", taskSubcategoryRouter);
app.use("/api/v1", portfolioRouter);
app.use("/api/v1", projectRouter);
app.use("/api/v1", depositRouter);
app.use("/api/v1", bidRouter);
app.use("/api/v1", mileStoneRouter);
app.use("/api/v1", messageRouter);

app.use("/", express.static("public/upload"));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`User with ID: ${userId} joined their room`);
  });

  socket.on("send_message", async (data) => {
    const { senderId, receiverId, content } = data;

    try {
      const newMessage = new Message({ senderId, receiverId, content });
      const savedMessage = await newMessage.save();

      io.to(receiverId).emit("receive_message", savedMessage);
      io.to(data.senderId).emit("receive_message", savedMessage);
    } catch (err) {
      console.error("Message save error:", err);
      socket.emit("error_message", { message: "Failed to send message" });
    }
  });


  socket.on("typing", (data) => {
    const { senderId, receiverId } = data;
    socket.to(receiverId).emit("typing", { senderId });
  });
  socket.on("stopTyping", (data) => {
    const { senderId, receiverId } = data;
    socket.to(receiverId).emit("stopTyping", { senderId });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
