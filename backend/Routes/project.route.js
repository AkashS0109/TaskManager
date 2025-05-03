import express from "express";
import {
    addProject,
    deleteProject,
    getAllProjects
} from "../controllers/project.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// Apply isAuthenticated middleware to all routes
router.use(isAuthenticated);

// Add a new project
router.post("/addproject", addProject);

// Delete a project by ID
router.delete("/deleteproject/:projectId", deleteProject);

// Get all projects for the logged-in user
router.get("/getallProjects/:userId", getAllProjects);

export default router;
