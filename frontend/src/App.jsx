import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Login from "./components/Admin/Login"
import SignUp from "./components/Admin/SignUp"
import Hero from "./components/Home/Hero"
import AddProject from "./components/Home/AddProject"
import { ToastContainer } from "react-toastify"
import React from "react";
const appRouter =createBrowserRouter([
  {path:"/",element:<Login/>},
  {path:"/signup",element:<SignUp/>},
  {path:"/home",element:<Hero/>},
  {
    path:"/projects/addproject/:proId", element:<AddProject/>
  }
])

function App() {
  return (
    <> 
     <RouterProvider router={appRouter}/>
     <ToastContainer position="top-center" autoClose={3000} />
    </>
  )
}

export default App
