import express from "express";
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task-controller.js";
import { authChecker } from "../middleware/authorization-checker.js";

const router = express.Router();

router.post("/create-task", authChecker, createTask);
router.get("/get-all-tasks", authChecker, getAllTasks);
router.put("/update-task/:task_id", authChecker, updateTask);
router.delete("/delete-task/:task_id", authChecker, deleteTask);

export default router;
