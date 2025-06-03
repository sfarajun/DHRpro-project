// API calls for Projects to Flask API Backend Microservice


const API_BASE_URL = 'http://localhost:5000';


// Get Projects (returns list of projects)
export async function getProjects() {
  const res = await fetch(`${API_BASE_URL}/projects`);
  return await res.json();
}

// Create Project
export async function createProject(data) {
  console.log("Create Project payload:", data);  // <-- Add this

  const res = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}

// Update Project
export async function updateProject(projectId, data) {
  console.log("Update Project payload:", data);  // <-- Add this

  const res = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}

// Delete Project
export async function deleteProject(projectId) {
  const res = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
    method: 'DELETE',
  });
  return res.ok;
}

// Fetch single project by id (returns )
export async function getProjectById(id) {
  const res = await fetch(`${API_BASE_URL}/projects/${id}`);
  // if (!res.ok) throw new Error('Failed to fetch project');
  return await res.json();
}


// API calls for Tasks to Flask API Backend Microservice

// Get Task
export async function getTasksByProject(projectId) {
  const res = await fetch(`${API_BASE_URL}/tasks?project_id=${projectId}`);
  const data = await res.json();
  await console.log("📤 Sending task payload:", data);  // <-- Add this
  // return await res.json();
  return await data;
}


// Create Task
export async function createTask(projectId, data) {  
  console.log("Create task payload:", { ...data, project_id: projectId });  // <-- Add this
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, project_id: projectId }),
  });
  return await res.json();
}


// Update Task
export async function updateTask(taskId, data) {
  console.log("Update task payload:", data);  // <-- Add this

  const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return await res.json();
}


// Delete Task
export async function deleteTask(taskId) {
  const res = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  });
  return res.ok;
}


// Get summary counts for all tasks
export const getTasksSummary = async () => {
  const res = await fetch(`${API_BASE_URL}/projects`);
  const response_json = await res.json();
  return {
    total: response_json.length,
    completed: response_json.filter(t => t.completed).length,
  };
};
