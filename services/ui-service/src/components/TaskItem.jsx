// components/TaskItem.jsx
import React from 'react';
import '../styles/TaskItem.css';


// Component for a single Task 
const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  // Prevent event bubbling for action buttons
  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit(task);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(task.id);
  };

  // Hanlder for Completion Checkbox
  // const handleToggle = () => {
  //   onToggle(task.id, !task.completed);
  // };

  return (
    <div className="task-item">

      {/* Task Content */}
      <div className="task-item-content card-container">
        
        {/* Checkbox for completion status */}
        {/* <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
          className="task-checkbox"
        /> */}

        <span className={`task-name ${task.completed ? 'completed' : ''}`}>
          {task.name}
        </span>
      </div>
      

      {/* Actions */}
      <div className="task-item-actions">
        {/* Delete button */}
        <button 
          className="icon-button edit-button" 
          onClick={handleEditClick}
          aria-label="Edit task"
        >
          <i className="fa fa-pencil"></i> Edit
        </button>
        
        {/* Edit button */}
        <button 
          className="icon-button delete-button" 
          onClick={handleDeleteClick}
          aria-label="Delete task"
        >
          <i className="fa fa-trash"></i> Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
