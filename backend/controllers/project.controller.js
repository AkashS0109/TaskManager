import Project from "../Models/project.model.js"
import mongoose from "mongoose";

export const addProject = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user._id;

        if (!name) {
            return res.status(400).json({ 
                success: false,
                message: "Project name is required" 
            });
        }

        const existingProject = await Project.findOne({ name, user: userId });

        if (existingProject) {
            return res.status(200).json({
                success: true,
                message: "Project already exists",
                project: existingProject
            });
        }

        // Check project count for this user
        const projectCount = await Project.countDocuments({ user: userId });
        if (projectCount >= 4) {
            return res.status(400).json({ 
                success: false,
                message: "Max 4 projects allowed per user" 
            });
        }

        // Create new project
        const newProject = await Project.create({ 
            name, 
            user: userId 
        });
        
        return res.status(201).json({ 
            success: true, 
            project: newProject 
        });

    } catch (error) {
        console.error("Add Project Error:", error);
        return res.status(500).json({ 
            success: false,
            message: error.message || "Server error" 
        });
    }
};

// Delete a project
export const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const userId = req.user._id;

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ 
                success: false,
                message: "Project not found" 
            });
        }

        // Check if the project belongs to the logged-in user
        if (project.user.toString() !== userId.toString()) {
            return res.status(403).json({ 
                success: false,
                message: "Unauthorized" 
            });
        }

        await project.deleteOne();
        return res.json({ 
            success: true, 
            message: "Project deleted" 
        });
    } catch (error) {
        console.error("Delete Project Error:", error);
        return res.status(500).json({ 
            success: false,
            message: error.message || "Server error" 
        });
    }
};



export const getAllProjects = async (req, res) => {
    try {
        let { userId } = req.params;
        
        // Remove any leading colon
        userId = userId.replace(/^:/, '');

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format."
            });
        }

        // Find projects for this user
        const projects = await Project.find({ user: userId })
            .sort({ createdAt: -1 });

        return res.json({
            success: true,
            projects
        });
    } catch (error) {
        console.error("Get Projects Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
};


