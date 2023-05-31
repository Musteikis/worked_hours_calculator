import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = ({ data }) => {
  const formattedData = data.reduce((acc, { date, workedHours }) => {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    acc[formattedDate] = workedHours;
    return acc;
  }, {});

  const tileContent = ({ date }) => {
    const gmtDate = new Date(date).toLocaleString('en-US', { timeZone: 'GMT' });
    const formattedDate = new Date(gmtDate).toISOString().split('T')[0];
    const workedHours = formattedData[formattedDate];
    return <div className="calendar-tooltip">{workedHours} Hours</div>;
  };

  const tileClassName = ({ date }) => {
    const gmtDate = new Date(date).toLocaleString('en-US', { timeZone: 'GMT' });
    const formattedDate = new Date(gmtDate).toISOString().split('T')[0];
    const workedHours = formattedData[formattedDate];
    const opacity = workedHours >= 8 ? 1000 : workedHours / 8 * 1000;
    return formattedData[formattedDate] ? `worked opacity-${opacity}` : 'disabled';
  };

  return (
    <div className="calendar-container">
      <Calendar
        tileContent={tileContent}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default CustomCalendar;
