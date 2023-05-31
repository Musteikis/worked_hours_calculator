import React, { useState } from 'react';
import Form from './components/Form';
import Calendar from './components/Calendar';
import './App.css';
import MainForm from './components/MainForm';

const App = () => {
  const [data, setData] = useState([]);
  const [mainData, setMainData] = useState({}); 

  const handleSubmit = (formData) => {
    setData([...data, formData]);
  };

  const handleMainSubmit = (formData) => {
    setMainData(formData);
  };

  const totalRequiredHours = mainData.totalHours || 0;
  const totalWorkedHours = data.reduce(
    (total, { workedHours }) => total + Number(workedHours),
    0
  );
  const totalRemainingHours = totalRequiredHours - totalWorkedHours;

  const remainingTime = new Date(mainData.dueDate) - new Date().getTime();

  let remainingString;
  if(remainingTime < 0) {
    remainingString = 'Due date has passed';
  } 
  else if (totalRemainingHours <= 0) {
    remainingString = 'You have completed the required hours';
  } else
  if (remainingTime >= (24 * 60 * 60 * 1000)) {
    const remainingDays = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
    remainingString = `${remainingDays} day${remainingDays > 1 ? 's' : ''}`;
  } else if (remainingTime >= (60 * 60 * 1000)) {
    const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
    remainingString = `${remainingHours} hour${remainingHours > 1 ? 's' : ''}`;
  } else if (remainingTime >= (60 * 1000)) {
    const remainingMinutes = Math.floor(remainingTime / (60 * 1000));
    remainingString = `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
  } else {
    const remainingSeconds = Math.floor(remainingTime / 1000);
    remainingString = `${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`;
  }

  return (
    <div className="app">
      <MainForm onSubmit={handleMainSubmit} />
      {
        !!totalRequiredHours  &&
          <div className="row">
        <div className="column">
          <Form onSubmit={handleSubmit} mainData={mainData} />
        </div>
        <div className="column form-container summary-section">
          <h2 className="section-title">Summary</h2>
          <div className="summary-item">
            <span className="summary-label">Total Required Hours:</span>
            <span className="summary-value">{totalRequiredHours}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Worked Hours:</span>
            <span className="summary-value">{totalWorkedHours}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Total Remaining Hours:</span>
            <span className="summary-value">{totalRemainingHours > 0 ? totalRemainingHours : 'You worked ' + Math.abs(totalRemainingHours) + ' more hours than expected'}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Deadline Day</span>
            <span className="summary-value">{mainData.dueDate}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Remaining Time:</span>
            <span className="summary-value">{remainingString}</span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Average Hours Need Per Day:</span>
            <span className="summary-value">{Math.round(totalRemainingHours / remainingTime * (24 * 60 * 60 * 1000) * 100) / 100}</span>
          </div>
        </div>
      </div>
      }
      <div className="row">
        <Calendar data={data} />
      </div>
    </div>
  );
};

export default App;
