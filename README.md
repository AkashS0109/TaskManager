# Task Management System

A full-stack task management application built with React, Express, and MongoDB. This application allows users to manage projects and tasks efficiently.

## Features

### User Management
- User registration and login
- Secure authentication using JWT
- User profile management

### Project Management
- Create, read, update, and delete projects
- Assign projects to users
- Track project progress

### Task Management
- Create, read, update, and delete tasks
- Assign tasks to projects
- Task status tracking (Not Started, In Progress, Completed)
- Task prioritization

### UI/UX Features
- Modern Material-UI interface
- Responsive design
- Toast notifications for actions
- Redux state management
- Persistent login state

## Tech Stack

### Frontend
- React 19
- Vite
- Material-UI
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt for password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Clone the Repository
1. Open your terminal and navigate to the directory where you want to clone the project
2. Clone the repository:
   ```bash
   git clone https://github.com/your-username/TaskManage.git
   ```
3. Navigate to the project directory:
   ```bash
   cd TaskManage
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   MONGO_URL=mongodb://localhost:8000/taskmanage
   PORT=3000
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
TaskManage/
├── backend/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Authentication middleware
│   ├── Models/         # MongoDB models
│   ├── Routes/         # API routes
│   ├── db.js           # Database connection
│   └── index.js        # Server entry point
└── frontend/
    ├── public/         # Static assets
    └── src/            # React application source
```

## API Endpoints

### User Routes
- POST /api/v1/user/register - Register a new user
- POST /api/v1/user/login - User login
- GET /api/v1/user/profile - Get user profile

### Project Routes
- POST /api/v1/project - Create a new project
- GET /api/v1/project - Get all projects
- GET /api/v1/project/:id - Get project by ID
- PUT /api/v1/project/:id - Update project
- DELETE /api/v1/project/:id - Delete project

### Task Routes
- POST /api/v1/tasks - Create a new task
- GET /api/v1/tasks - Get all tasks
- GET /api/v1/tasks/:id - Get task by ID
- PUT /api/v1/tasks/:id - Update task
- DELETE /api/v1/tasks/:id - Delete task

## Example Credentials

For testing purposes, you can use the following credentials:

- Email: John1@gmail.com
- Password: John

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 