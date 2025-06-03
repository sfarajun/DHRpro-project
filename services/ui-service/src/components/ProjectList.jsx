// components/ProjectList.jsx
import React from 'react';
import ProjectItem from './ProjectItem';


// Component for All projects stacked in a list
const ProjectList = ({projects = [], onProjectClick, isLoading = false, onDeleteProject, onEditProject,}) => {
  // Render loading state
  if (isLoading) {
    return (
      <div className='project-list-container'>
        <h2 className='project-list-title'>My Projects</h2>
        <div className='loading-indicator'>Loading projects...</div>
      </div>
    );
  }

  // Render empty state
  if (projects.length === 0) {
    return (
      <div className='project-list-container'>
        <h2 className='project-list-title'>My Projects</h2>
        <div className='empty-state'>
          <p>No projects found. Create a new project to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='project-list-container'>
      <h2 className='project-list-title'>My Projects</h2>
      <div className='project-list'>
        {projects.map(project => (
          <ProjectItem
            key={project.id}
            project={project}
            onClick={() => onProjectClick(project)}
            onDelete={() => onDeleteProject(project.id)}
            onEdit={() => onEditProject(project)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;