# Task Management Application (MERN Stack)

## Overview
This is a full-stack task management application built using the MERN (MongoDB, Express, React, Node.js) stack. It allows users to register, login, create, update, delete tasks, assign them to team members, track task statuses, and generate task summary reports.

## Features
- **User Authentication**: Register, login, and logout functionality using JWT (JSON Web Tokens).
- **Task Management**: Create, update, delete tasks, and assign tasks to users.
- **Task Tracking**: Track task statuses (To Do, In Progress, Completed).
- **Task Summary**: Generate task reports filtered by status, user, or date.

## Installation

### Backend

1. Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd backend
    ```

2. Install backend dependencies:
    ```bash
    npm install
    ```

3. Set up `.env` file:
    ```bash
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend

1. Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```

2. Install frontend dependencies:
    ```bash
    npm install
    ```

3. Start the frontend application:
    ```bash
    npm start
    ```

## Folder Structure

```bash
