import React, { useState } from 'react';

const MainForm = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [totalHours, setTotalHours] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const gmtStartDate = new Date(`${startDate}`).toLocaleDateString('en-US', { timeZone: 'GMT' });
    const gmtDueDate = new Date(`${dueDate}`).toLocaleDateString('en-US', { timeZone: 'GMT' });
    onSubmit({ startDate: gmtStartDate, dueDate: gmtDueDate ,totalHours});
    setStartDate('');
    setDueDate('');
    setTotalHours('');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Project Details</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Start Date:</label>
          <input
            className="form-input"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Due Date:</label>
          <input
            className="form-input"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Total Required Hours:</label>
          <input
            className="form-input"
            type="number"
            value={totalHours}
            onChange={(e) => setTotalHours(e.target.value)}
          />
        </div>
        <button className="form-submit" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MainForm;
