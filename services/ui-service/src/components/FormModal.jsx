// components/FormModal.jsx
import React, { useState, useEffect } from 'react';
import '../styles/FormModal.css';


// Component for Modal to create or edit project/task
const FormModal = ({ title, initialValues, onSave, onCancel, type }) => {
  const [formData, setFormData] = useState(initialValues || { name: '' });  //type is 'project' or 'task'

  // Reset form when initialValues change
  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    } else {
      setFormData({ name: '' });
    }
  }, [initialValues]);


  // handle changes to task/project 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // hanlde submit
  const handleSubmit = (e) => {
    // console.log(" Submitting payload:", formData);
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
    }
  };


  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{title}</h2>
        <form onSubmit={handleSubmit}>

          {/* Input Task/Project name */}
          <div className="form-group">
            <label htmlFor="name">{type === 'project' ? 'Project' : 'Task'} Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              autoFocus
              placeholder={`Enter ${type} name...`}
            />
          </div>
          
          {/* Actions Buttons*/}
          <div className="form-actions">
            <button type="button" className="button-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="button-save">
              Save
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default FormModal;