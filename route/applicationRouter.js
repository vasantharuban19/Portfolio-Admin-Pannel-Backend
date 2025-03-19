import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addNewApplication,
  deleteApplication,
  getAllApplications,
} from "../controller/applicationController.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewApplication);
router.delete("/delete/:id", isAuthenticated, deleteApplication);
router.get("/getall", getAllApplications);

export default router;
