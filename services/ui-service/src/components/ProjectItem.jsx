// components/ProjectItem.jsx
import React from 'react';
import '../styles/ProjectItem.css';

// Components for Project Item
const ProjectItem = ({ project, onClick, onDelete, onEdit }) => {
  // Prevent event bubbling for action buttons
  const handleEditClick = (e) => {
    e.stopPropagation();
    onEdit();
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete();
  };

  
  return (
    <div className="project-item" onClick={onClick}>
      {/* Project name */}
      <div className="project-item-name card-container">
        {project.name}
      </div>
      
      {/* Action buttons */}
      <div className="project-item-actions">
        {/* Edit button - pencil icon */}
        <button 
          className="icon-button edit-button" 
          onClick={handleEditClick}
          aria-label="Edit project"
        >
          <i className="fa-solid fa-pencil"></i>
        </button>
        
        {/* Delete button - trash icon */}
        <button 
          className="icon-button delete-button" 
          onClick={handleDeleteClick}
          aria-label="Delete project"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default ProjectItem;