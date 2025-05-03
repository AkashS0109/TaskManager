import express from "express";
import {
    addTask,
    deleteTask,
    updateTask,
    getTasksByProject,
    
} from "../controllers/task.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";  

const router = express.Router();

// Apply isAuthenticated middleware to all routes
router.use(isAuthenticated);

router.get("/project/:projectId", getTasksByProject);
router.post("/addtask", addTask);

// Delete a task
router.delete("/deletetask/:taskId", deleteTask);

// Update a task (title, description, etc.)
router.put("/updatetask/:taskId", updateTask);


export default router;
