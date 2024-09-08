import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.use(authMiddleware);

router.post("/createTask", createTask);
router.get("/getTasks/:projectId", getTasks);
router.get("/getTaskById/:id", getTaskById);
router.patch("/updateTask/:id", updateTask);
router.delete("/deleteTask/:id", deleteTask);

export default router;
