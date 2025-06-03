import React, { useState, useEffect } from 'react';
import * as api from './services/api';
import './styles/App.css'; 


// import SearchBar from './components/SearchBar';
import TaskList from './components/TaskList';
import ProjectList from './components/ProjectList';
import ProjectDetailsPanel from './components/ProjectDetailsPanel';
import FloatingActionButton from './components/FloatingActionButton';
import FormModal from './components/FormModal';

export function App(props) {

  // State related
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  // const [searchQuery, setSearchQuery] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,     // project or task
    mode: null,     // create or edit
    data: null      // if edit, data to edit
  });

  
  // ---------------- FUNCTIONS -----------------------
  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      setIsLoading(true);

      //update Projects from API
      const data = await api.getProjects(); // returns list of projects
      setProjects(data);
      setIsLoading(false);

    } catch (err) {
      setError('Failed to load projects');
      setIsLoading(false);
      console.error(err);
    }
  };

  // Function to fetch tasks for a specific project
  const fetchTasks = async (projectId) => {
    try {
      setIsLoading(true);
      
      // Fetch Tasks from API
      const data = await api.getTasksByProject(projectId);  //returns list of tasks for project
      setTasks(data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load tasks');
      setIsLoading(false);
      console.error(err);
    }
  };

  // Function to open modal for creating/editing projects
  const openProjectModal = (mode, project = null) => {
    setModalState({
      isOpen: true,
      type: 'project',
      mode,
      data: project
    });
  };
  
  // Function to open modal for creating/editing tasks
  const openTaskModal = (mode, task = null) => {
    setModalState({
      isOpen: true,
      type: 'task',
      mode,
      data: task
    });
  };
  
  // Function to close modal
  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
      mode: null,
      data: null
    });
  };
  // ------------------------------------------------------




  // ------------- EVENT HANDLERS -----------
  // Fetch projects when component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  // Fetch tasks when component mounts or when selected project changes
  useEffect(() => {
    if (selectedProject) {
      fetchTasks(selectedProject.id);
    }
  }, [selectedProject]);

  // Handler for when a project is clicked
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsPanelOpen(true);
  };

  // Handler for closing the project details panel
  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  // Handle saving project data (create or edit)
  const handleSaveProject = async (formData) => {
    try {
      let result;
      
      if (modalState.mode === 'create') {
        // Create new project
        result = await api.createProject(formData);
        setProjects([...projects, result]);
      } else {
        // Edit existing project 
        result = await api.updateProject(modalState.data.id, formData);
        setProjects(projects.map(p => p.id === result.id ? result : p));  //expects id of result to be same to work
      }
      
      closeModal();
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };
  
  // Handle saving task data (create or edit)
  const handleSaveTask = async (formData) => {
    try {
      let result;
      
      if (modalState.mode === 'create') {
        // Create new task
        // console.log("Saving task data:", formData);
        result = await api.createTask(
          selectedProject.id,
          formData,
        );
        setTasks([...tasks, result]);
      } else {
        // Edit existing task
        result = await api.updateTask(
          modalState.data.id, 
          formData
        );
        setTasks(tasks.map(t => t.id === result.id ? result : t));
      }
      
      closeModal();
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  //Handle Deleting Project
  const handleDeleteProject = async (projectId) => {
    // Confirm deletion
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        // delete project
        await api.deleteProject(projectId);
        
        // Update projects state to filter out deleted project
        setProjects(projects.filter(project => project.id !== projectId));
        
        // Clsoe panel if the deleted project was selected
        if (selectedProject && selectedProject.id === projectId) {
          setSelectedProject(null);
          setIsPanelOpen(false);
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project");
      }
    }
  };

  // Handle Deleting Task
  const handleDeleteTask = async (taskId) => {
    // Confirm deletion
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        // Call API to delete the task
        await api.deleteTask(taskId);
        
        // Update state to filte out deleted task
        setTasks(tasks.filter(task => task.id !== taskId));
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task");
      }
    }
  };
  // ----------------------------------------


  
  // Count total and completed tasks
  const totalProjects = projects.length;
  const totalSelectedTasks = tasks.length;

  // Actual Content of the Main Page
  return (
    <div className='app-container'>

      {/* Main content area */}
      <main className='main-content'>

        {/* Task summary boxes (All Tasks and Completed Tasks) */}
        <div className="task-boxes-container">
          <TaskList title="Selected Project's Tasks" count={totalSelectedTasks} />
          <TaskList title="All Projects" count={totalProjects} />
        </div>
      
        {/* Projects list with heading */}
        <ProjectList 
          projects={projects}
          onProjectClick={handleProjectClick}
          onEditProject={(project) => openProjectModal('edit', project)}
          onDeleteProject={handleDeleteProject}
          isLoading={isLoading}
        />
        
        {/* New Project button with handler */}
        <FloatingActionButton 
          label="New Project" 
          onClick={() => openProjectModal('create')}
        />
        
        {/* ProjectDetailsPanel with updated handlers */}
        {isPanelOpen && selectedProject && (
          <ProjectDetailsPanel 
            project={selectedProject}
            tasks={tasks}
            onClose={handleClosePanel}
            onAddTask={() => openTaskModal('create')}
            onEditTask={(task) => openTaskModal('edit', task)}
            onDeleteTask={handleDeleteTask}
            // onToggleTask={handleToggleTask}
          />
        )}
        
        {/* Reusable modal */}
        {modalState.isOpen && (
          <FormModal
            title={
              modalState.mode === 'create'
                ? `Create ${modalState.type === 'project' ? 'Project' : 'Task'}`
                : `Edit ${modalState.type === 'project' ? 'Project' : 'Task'}`
            }
            initialValues={modalState.data}
            onSave={modalState.type === 'project' ? handleSaveProject : handleSaveTask}
            onCancel={closeModal}
            type={modalState.type}
          />
        )}
      </main>

      {/* Display error if any */}
      {error && <div className='error-message'>{error}</div>}

    </div>
  );
}

// Log to console
console.log('Hello console')