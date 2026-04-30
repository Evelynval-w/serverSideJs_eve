import express from "express";
import {
  getAllCircles,
  getCircleById,
  createCircle,
  updateCircle,
  deleteCircle,
} from "../controllers/mentorCircleController.js";
import { authCheck } from "../middleware/auth-middleware.js";

const mentorCircleRouter = express.Router();

mentorCircleRouter.use(authCheck);

mentorCircleRouter.get("/", getAllCircles);
mentorCircleRouter.get("/:id", getCircleById);
mentorCircleRouter.post("/", createCircle);
mentorCircleRouter.put("/:id", updateCircle);
mentorCircleRouter.delete("/:id", deleteCircle);

export default mentorCircleRouter;