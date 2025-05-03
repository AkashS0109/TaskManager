import React, { useState, useEffect } from "react";
import axios from "axios";
import { TASK } from "../../constant"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddProject = () => {
  const { proId } = useParams();
  const ProjectId = proId.startsWith(":") ? proId.slice(1) : proId;

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState({
    title: "",
    description: "",
    status: "Not Started",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");


  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${TASK}/project/${ProjectId}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });


      if (!response.data) {
        console.error("No data in response");
        setError("No data received from server");
        return;
      }

      if (response.data.success === false) {

        setError(response.data.message || "Failed to fetch tasks");
        return;
      }


      const tasks = Array.isArray(response.data.tasks) ? response.data.tasks : [];


      if (tasks.length === 0) {
        console.log("No tasks found for this project");
        setTasks([]);
        return;
      }

      setTasks(tasks);
    } catch (error) {
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });

      if (error.response?.status === 401) {
        setError("Please log in to view tasks");
      } else if (error.response?.status === 403) {
        setError("You don't have permission to view these tasks");
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to fetch tasks. Please try again.");
      }

      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    if (ProjectId) {
      fetchTasks();
    } else {

      setError("No project ID provided");
    }
  }, [ProjectId]);


  const filteredTasks = Array.isArray(tasks) ? tasks.filter(task => {
    if (filter === "all") return true;
    return task.status.toLowerCase() === filter.toLowerCase();
  }) : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const { title, description, status } = taskInput || {};
    if (!title || !description) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      if (editIndex !== null) {
        // Update existing task
        const taskToUpdate = tasks[editIndex];
        console.log("Updating task with ID:", taskToUpdate._id);
        const response = await axios.put(`${TASK}/updatetask/${taskToUpdate._id}`, {
          title,
          description,
          status,
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.data.success) {
          toast.success("Task updated successfully");
          setEditIndex(null);
          fetchTasks();
        } else {
          throw new Error(response.data.message || "Failed to update task");
        }
      } else {
        // Add new task
        const response = await axios.post(`${TASK}/addtask`, {
          title,
          description,
          status,
          ProjectId,
        }, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.data.success) {
          toast.success("Task added successfully");
          fetchTasks();
        } else {
          throw new Error(response.data.message || "Failed to add task");
        }
      }
      setTaskInput({
        title: "",
        description: "",
        status: "Not Started",
      });
    } catch (error) {
      console.error("Error saving task:", error);
      toast.error(error.response?.data?.message || "Failed to save task");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    setLoading(true);
    try {

      const response = await axios.delete(`${TASK}/deletetask/${id}`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log("Delete response:", response.data);

      if (response.data && response.data.success) {
        toast.success(response.data.message || "Task deleted successfully");

        setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      } else {
        throw new Error(response.data?.message || "Failed to delete task");
      }
    } catch (error) {

      const errorMessage = error.response?.data?.message || error.message || "Failed to delete task";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const task = tasks[index];
    setTaskInput({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const handleComplete = async (id) => {
    setLoading(true);
    try {
      await axios.put(`/api/v1/tasks/updatetask/${id}`, { status: "Completed" }, { withCredentials: true });
      toast.success("Task marked as completed");
      fetchTasks();
    } catch (error) {
      console.error("Error marking complete:", error);
      toast.error("Failed to update task status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Add New Task</h2>

        <form onSubmit={handleAddOrUpdate} className="space-y-4">
          <div>
            <input
              type="text"
              name="title"
              value={taskInput.title}
              onChange={handleChange}
              placeholder="Task Title"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <textarea
              name="description"
              value={taskInput.description}
              onChange={handleChange}
              placeholder="Task Description"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <select
              name="status"
              value={taskInput.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Processing..." : (editIndex !== null ? "Update Task" : "Add Task")}
          </button>
        </form>
      </div>

      {/* All Tasks Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">All Tasks</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="in progress">In Progress</option>
            <option value="not started">Not Started</option>
          </select>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">Loading tasks...</div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No tasks yet. Add your first task above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTasks.map((task, index) => (
              <div
                key={task._id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    <p className="text-gray-600 mt-1">{task.description}</p>
                    <div className="mt-2 space-x-2">
                      <span className={`px-2 py-1 rounded text-sm ${task.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : task.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                        {task.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        Created: {new Date(task.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                      title="Edit task"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                      title="Delete task"
                    >
                      🗑️
                    </button>
                    {task.status !== "Completed" && (
                      <button
                        onClick={() => handleComplete(task._id)}
                        className="p-2 text-green-500 hover:bg-green-50 rounded"
                        title="Mark as completed"
                      >
                        ✅
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProject;
