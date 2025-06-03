// components/ProjectDetailsPanel.jsx
import React, { useState } from 'react';
import TaskItem from './TaskItem';
import '../styles/ProjectDetailsPanel.css';


// Component for the Project Details pannel
const ProjectDetailsPanel = ({ 
  project, 
  tasks = [], 
  onClose, 
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleTask
}) => {

  return (
    <div className="project-details-panel">

      {/* Header and Close Button */}
      <div className="project-details-header">
        <h2>{project.name}</h2>
        <button className="close-button" onClick={onClose} aria-label="Close panel">
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Add New Task */}
      <div className="add-task-form">
        <button className="add-task-button" onClick={onAddTask}>
          <i className="fas fa-plus"></i> Add
        </button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              // onToggle={onToggleTask}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
            />
          ))
        ) : (
          <div className="empty-task-list">
            <p>No tasks yet. Add one above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsPanel;