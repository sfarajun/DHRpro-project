// components/FloatingActionButton.jsx
import React from 'react';
import '../styles/FloatingActionButton.css';

// Component for Action Buttons
const FloatingActionButton = ({ label, onClick }) => {
  return (
    <div className="floating-action-button-container">
      <button className="floating-action-button" onClick={onClick} aria-label={label}>
        <i className="fas fa-plus"></i>
      </button>
      <span className="floating-action-button-label">{label}</span>
    </div>
  );
};

export default FloatingActionButton;