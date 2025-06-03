// components/TaskList.jsx
import React from 'react';
import '../styles/TaskList.css';


// Component for the Summary Boxes
const TaskList = ({ title, count }) => {
  return (
    <div className="task-list-box card-container">
      <h3 className="task-list-box-title">{title}</h3>
      <div className="task-list-box-count">{count}</div>
    </div>
  );
};

export default TaskList;