import express from "express";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
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
import indexRouter from "./route/indexRouter.js";
import { corsOption } from "./config/corsConfig.js";

dotenv.config({ path: "./config/config.env" });

const PORT = process.env.PORT || 5000;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(cors(corsOption));
app.options("*", cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/", indexRouter);
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/timeline", timeLineRouter);
app.use("/api/v1/softwareapplication", applicatioRouter);
app.use("/api/v1/skill", skillRouter);
app.use("/api/v1/project", projectRouter);

app.listen(PORT, () => {
  connectDatabase();
  console.log(`Server Listening at port ${PORT}`);
});

app.use(errorMiddleware);

export default app;
