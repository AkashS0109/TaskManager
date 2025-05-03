import React from 'react';
import Navbar from './Navbar';
import ProjectsContainer from './ProjectsContainer';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useGetAllProjects from '../../hooks/useProjects';
import {TASK} from "../../constant"
import axios from "axios"

const Hero = () => {
   const navigate =useNavigate();
  const projects = useSelector(state => state.projects.projects); 
  const { user } = useSelector(store => store.auth);
    
    useGetAllProjects(user?._id);

    const fetchTasks = async (projectId) => {
      try {
        const response = await axios.get(`${TASK}/project/${projectId}`, { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }});
        
        // Redirect to project tasks page
        navigate(`/projects/addproject/:${projectId}`);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
 
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ProjectsContainer />

      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
              <div key={project._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold">{project.name}</h3>
                <p className="text-gray-600 text-sm">
                  Created: {new Date(project.createdAt).toLocaleDateString()}
                </p>
                <button
                  onClick={() => fetchTasks(project._id)} // Fetch tasks on click
                  className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  View Tasks
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No projects found. Create your first project!</p>
        )}
      </div>
    </div>
  );
};

export default Hero;
