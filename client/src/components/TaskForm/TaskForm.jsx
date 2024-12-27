import { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskForm.css'; // Assuming you have a CSS file for styling

const TaskForm = ({ fetchTasks, taskToUpdate, resetUpdateMode }) => {
  // State for task form data
  const [taskFormData, setTaskFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'To Do', // Default status
    priority: 'Medium', // Default priority
  });

  // UseEffect to populate the form when editing a task
  useEffect(() => {
    if (taskToUpdate) {
      setTaskFormData({
        title: taskToUpdate.title,
        description: taskToUpdate.description,
        dueDate: taskToUpdate.dueDate,
        status: taskToUpdate.status,
        priority: taskToUpdate.priority,
      });
    } else {
      resetForm(); // Reset form if no task to update
    }
  }, [taskToUpdate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (taskToUpdate) {
        // Update existing task
        await axios.put(`http://localhost:5000/tasks/${taskToUpdate._id}`, taskFormData, {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
      } else {
        // Add new task
        await axios.post('http://localhost:5000/tasks', taskFormData, {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
      }
      fetchTasks(); // Refresh the task list after successful submission
      resetForm(); // Reset the form
      resetUpdateMode(); // Exit update mode if it was in update mode
    } catch (error) {
      console.error('Error submitting task:', error);
      alert('Failed to add/update task. Please try again.');
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setTaskFormData({
      ...taskFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Reset form fields
  const resetForm = () => {
    setTaskFormData({
      title: '',
      description: '',
      dueDate: '',
      status: 'To Do',
      priority: 'Medium',
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        value={taskFormData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Task Description"
        value={taskFormData.description}
        onChange={handleChange}
      ></textarea>
      <input
        type="date"
        name="dueDate"
        value={taskFormData.dueDate}
        onChange={handleChange}
      />
      <select name="status" value={taskFormData.status} onChange={handleChange}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select name="priority" value={taskFormData.priority} onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit">
        {taskToUpdate ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
