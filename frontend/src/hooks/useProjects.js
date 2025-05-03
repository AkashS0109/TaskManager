import React, { useEffect } from 'react'
import axios from "axios"
import {PROJECT} from "../constant"
import { useDispatch } from 'react-redux'
import { setProjects } from '../redux/projectSlice'

function useGetAllProjects(proId) {
    const dispatch = useDispatch();
     console.log(proId)
    useEffect(() => {
        const fetchAllProjects = async () => {
            try {
                const res = await axios.get(
                    `${PROJECT}/getallProjects/:${proId}`,
                    { withCredentials: true }
                );
                console.log(res);
                if (res.data.success) {
                    dispatch(setProjects(res.data.projects));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllProjects();
    }, [dispatch]);
}

export default useGetAllProjects; 