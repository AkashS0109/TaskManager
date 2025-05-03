import Task from "../Models/task.model.js";
import Project from "../Models/project.model.js";

// Add a task to a project
export const addTask = async (req, res) => {
    try {
        const { title, description, status, ProjectId } = req.body;
        const userId = req.user._id;

        console.log("Creating task with:", {
            title,
            description,
            status,
            ProjectId,
            userId
        });

        // Verify project exists
        const project = await Project.findById(ProjectId);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        // Create new task
        const newTask = await Task.create({
            title,
            description,
            status: status || "Not Started",
            ProjectId,
            user: userId
        });

        console.log("Task created:", newTask);

        return res.status(201).json({
            success: true,
            task: newTask
        });
    } catch (error) {
        
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

// Update a task


export const updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { title, description, status } = req.body;
        
        console.log("Updating task with ID:", taskId);
        console.log("Update data:", { title, description, status });

        if (!taskId) {
            return res.status(400).json({
                success: false,
                message: "Task ID is required"
            });
        }

        // Find the task first
        const task = await Task.findById(taskId);
        if (!task) {
            console.log("Task not found with ID:", taskId);
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Update the task
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                title: title || task.title,
                description: description || task.description,
                status: status || task.status
            },
            { new: true } 
        );

        if (!updatedTask) {
            return res.status(500).json({
                success: false,
                message: "Failed to update task"
            });
        }

        console.log("Successfully updated task:", updatedTask);
        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task: updatedTask
        });
    } catch (error) {
        console.error("Error in updateTask:", error);
        console.error("Error stack:", error.stack);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to update task"
        });
    }
};


// Delete a task
export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
       

        if (!taskId) {
            console.log("No task ID provided");
            return res.status(400).json({
                success: false,
                message: "Task ID is required"
            });
        }

        
        const deletedTask = await Task.findOneAndDelete({ _id: taskId });
        
        if (!deletedTask) {
            console.log("Task not found with ID:", taskId);
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        console.log("Successfully deleted task:", deletedTask);
        return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            deletedTask
        });
    } catch (error) {
        console.error("Error in deleteTask:", error);
     
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to delete task",
            error: error
        });
    }
};

export const getTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        console.log("Fetching tasks for project ID:", projectId);

        // First verify the project exists
        const project = await Project.findById(projectId);
        if (!project) {
            console.log("Project not found:", projectId);
            return res.status(404).json({ 
                success: false, 
                message: "Project not found" 
            });
        }

        // Fetch all tasks for this project
        const tasks = await Task.find({ 
            ProjectId: projectId 
        }).sort({ createdAt: -1 });

        console.log("Found tasks count:", tasks.length);
        console.log("Tasks:", tasks);

        // Always return a success response with tasks array
        return res.status(200).json({ 
            success: true, 
            tasks: tasks || [] 
        });
    } catch (error) {
        console.error("Get Tasks Error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Server error",
            error: error.message 
        });
    }
};

// Get all tasks for a user
export const getAllTasks = async (req, res) => {
    try {
        const projectId = req.params.projectId;  // assuming you pass it as a route param
        console.log("Fetching tasks for project:", projectId);
  
        // Find all tasks related to the given project ID

        const tasks = await Task.find({ ProjectId: projectId })
            .populate('ProjectId', 'title')
            .sort({ createdAt: -1 });

        console.log("Found tasks:", tasks);

        return res.status(200).json({
            success: true,
            tasks: tasks || []
        });
    } catch (error) {
        console.error("Get All Tasks Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


