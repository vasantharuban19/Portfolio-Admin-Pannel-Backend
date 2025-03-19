import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import connectDatabase from "./database/database.js";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./route/messageRouter.js";
import userRouter from "./route/userRouter.js";
import timeLineRouter from "./route/timeLineRouter.js";
import applicatioRouter from "./route/applicationRouter.js";
import skillRouter from "./route/skillRouter.js";
import projectRouter from "./route/projectRouter.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timeLineRouter);
app.use("/api/v1/softwareapplication", applicatioRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter);

connectDatabase();
app.use(errorMiddleware);

export default app;
