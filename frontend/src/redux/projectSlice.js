
import { createSlice } from '@reduxjs/toolkit';

const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        projects: [],
        loading: false,
        error: null
    },
    reducers: {
        addProject: (state, action) => {
            state.projects.push({
                _id: Date.now().toString(),
                name: action.payload,
                createdAt: new Date().toISOString()
            });
        },
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        deleteProject: (state, action) => {
            state.projects = state.projects.filter(project => project._id !== action.payload);
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

export const { addProject, deleteProject,setProjects, clearError } = projectSlice.actions;
export default projectSlice.reducer;
