import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import TaskList from './components/TaskList/TaskList.jsx';
import TaskForm from './components/TaskForm/TaskForm.jsx';
import Register from './components/Auth/Register.jsx';
import Login from './components/Auth/login.jsx';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/tasks', {
        headers: { 'x-auth-token': token }
      });
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to fetch tasks. Please check the backend server.");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/tasks/${id}`, {
      headers: { 'x-auth-token': token }
    });
    fetchTasks();
  };

  const resetUpdateMode = () => {
    setTaskToUpdate(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        <nav>
          <Link to="/">Home</Link>
          {!isAuthenticated ? (
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </nav>

        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? (
              <div>
                <h1>Task Manager</h1>
                <TaskForm fetchTasks={fetchTasks} taskToUpdate={taskToUpdate} resetUpdateMode={resetUpdateMode} />
                <TaskList tasks={tasks} setTaskToUpdate={setTaskToUpdate} handleDelete={handleDelete} />
              </div>
            ) : (
              <Navigate to="/login" />
            )}
          />
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
