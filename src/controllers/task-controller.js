import Task from "../models/task.js";
import User from "../models/user.js";
import { errorHandler } from "../utils/error-handlers.js";
import { findTargetUser } from "../utils/find-target-user.js";
import { validateCreateTask, validateUpdateTask } from "../utils/validation.js";

/* 
  Method - POST  
  Route - tasks/create-task
  Access - Authorized
*/
const createTask = async (req, res) => {
  const { error: isValidTask } = await validateCreateTask(req.body);
  if (isValidTask) {
    return errorHandler(403, isValidTask.message, res);
  }

  try {
    let values = req.body;
    const targetUser = await findTargetUser(req.decodedToken.email, User);
    values.user = targetUser._id.toString();

    await Task.create(values);
    res.status(200).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    errorHandler(403, error.message, res);
  }
};

/* 
  Method - GET  
  Route - tasks/get-all-tasks
  Access - Authorized
*/
const getAllTasks = async (req, res) => {
  try {
    const targetUser = await findTargetUser(req.decodedToken.email, User);
    const allTasks = await Task.find({ user: targetUser._id });
    res.status(200).json({ tasks: allTasks });
  } catch (error) {
    errorHandler(403, error.message, res);
  }
};

/* 
  Method - PUT  
  Route - tasks/update-task/:task_id
  Access - Authorized
*/
const updateTask = async (req, res) => {
  if (!req.params.task_id) {
    return errorHandler(403, "please provide a task id to update", res);
  } else {
    const { error } = await validateUpdateTask(req.body);
    if (error) {
      return errorHandler(403, error.message, res);
    } else {
      try {
        const targetUser = await findTargetUser(req.decodedToken.email, User);
        const taskToBeUpdated = await Task.findOne({
          user: targetUser._id,
          _id: req.params.task_id,
        });
        if (!taskToBeUpdated) {
          return res.status(404).json({ error: "Task not found" });
        } else {
          await Task.updateOne(taskToBeUpdated, req.body);
          res.status(200).json("Task updated");
        }
      } catch (error) {
        errorHandler(403, error.message, res);
      }
    }
  }
};

/* 
  Method - DELETE  
  Route - tasks/delete-task/:task_id
  Access - Authorized
*/
const deleteTask = async (req, res) => {
  if (!req.params.task_id) {
    return errorHandler(400, "please provide a task id", res);
  } else {
    try {
      const targetUser = await findTargetUser(req.decodedToken.email, User);
      const taskToBeDeleted = await Task.findOne({
        user: targetUser._id,
        _id: req.params.task_id,
      });

      if (!taskToBeDeleted) {
        return res.status(404).json({ error: "Task not found" });
      } else {
        await Task.deleteOne(taskToBeDeleted[0]);
        res.status(200).json({ message: "Task deleted" });
      }
    } catch (error) {
      errorHandler(403, error.message, res);
    }
  }
};

export { createTask, getAllTasks, updateTask, deleteTask };
