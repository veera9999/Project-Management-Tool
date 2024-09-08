import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.use(authMiddleware);

router.post("/createProject", createProject);
router.get("/getProjects", getProjects);
router.get("/getProjectById/:id", getProjectById);
router.patch("/updateProject/:id", updateProject);
router.delete("/deleteProject/:id", deleteProject);

export default router;
