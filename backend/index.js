import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import userRoute from "./Routes/user.route.js";
import projectRoute from "./Routes/project.route.js"
import taskRoute from "./Routes/task.route.js"
 

 

// Load environment variables
dotenv.config({ });
const app = express();




// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
     origin: ["http://localhost:5173","http://localhost:8000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));


// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/project", projectRoute);
app.use("/api/v1/tasks",taskRoute);







 const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    connectDB();
        console.log(`Server Running at port number ${PORT}`);
    });

