import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, TextField } from "@mui/material";
import axios from "axios";
import { PROJECT } from "../../constant";
import { useSelector } from "react-redux";

const ProjectsContainer = () => {
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth);


    const [projectName, setProjectName] = useState("");

    const handleCreateProject = async () => {
        if (!projectName.trim()) {
            alert("Please enter a project name.");
            return;
        }

        try {
            const response = await axios.post(`${PROJECT}/addproject`, {
                userId: user._id,
                name: projectName,
                createdAt: Date.now()
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (response.data.success) {
                console.log("Project created:", response.data.project);
                const proId = response.data.project._id;
                navigate(`/projects/addproject/:${proId}`);
            } else {
                console.error("Failed to create project:", response.data.message);
            }
        } catch (error) {
            console.error("Error creating project:", error.response?.data || error.message);
        }
    };


    return (
        <Box
            sx={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: 4,
            }}
        >
            <Typography variant="h3" fontWeight="bold">
                Projects
            </Typography>

            {/* Input for project name */}
            <TextField
                label="Project Name"
                variant="outlined"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                sx={{ width: "300px" }}
            />

            <Button
                onClick={handleCreateProject}
                variant="contained"
                sx={{
                    width: "300px",
                    height: "60px",
                    borderRadius: "12px",
                    fontSize: "1.2rem",
                    backgroundColor: "#5812C2",
                    '&:hover': {
                        backgroundColor: "#3d0e8f",
                    }
                }}
            >
                Create Project
            </Button>
        </Box>
    );
};

export default ProjectsContainer;