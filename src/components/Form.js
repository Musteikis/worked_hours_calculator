import React, { useState } from 'react';

const Form = ({ onSubmit, mainData }) => {
  const [date, setDate] = useState('');
  const [workedHours, setWorkedHours] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const gmtDate = new Date(`${date}T00:00:00Z`).toLocaleString('en-US', { timeZone: 'GMT' });
    onSubmit({ date: gmtDate, workedHours });
    setDate('');
    setWorkedHours('');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Submit Worked Hours</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Date:</label>
          <input
            className="form-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Worked Hours:</label>
          <input
            className="form-input"
            type="number"
            value={workedHours}
            onChange={(e) => setWorkedHours(e.target.value)}
            min={0}
          />
        </div>
        <button className="form-submit" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
