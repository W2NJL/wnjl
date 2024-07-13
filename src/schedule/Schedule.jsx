import React from 'react';
import PropTypes from 'prop-types';
import './Schedule.css';

const Schedule = (props) => {
  const schedule = [
    { day: 'Monday', time: 'All day', show: 'Smooth Jazz Programming' },
    { day: 'Tuesday', time: 'All day', show: 'Smooth Jazz Programming' },
    { day: 'Wednesday', time: 'All day', show: 'Smooth Jazz Programming' },
    { day: 'Thursday', time: 'All day', show: 'Smooth Jazz Programming' },
    { day: 'Thursday', time: '7:00 PM - 8:30 PM', show: 'Lancaster Avenue Oasis hosted by Nick Langan' },
    { day: 'Friday', time: 'All day', show: 'Smooth Jazz Programming' },
    { day: 'Friday', time: '7:00 PM - 8:00 PM', show: 'Cool Jazz Weekly with Mike Regensburger' },
    { day: 'Friday', time: '8:00 PM - 9:00 PM', show: 'Cool Jazz Weekly Extra with Mike Regensburger' },
    { day: 'Saturday', time: 'All day', show: 'Smooth Jazz Programming' },
    { day: 'Saturday', time: '10:00 AM - 12:00 PM', show: 'The Smooth Jazz Top 20 Countdown with Allen Kepler' },
    { day: 'Sunday', time: 'All day', show: 'Smooth Jazz Programming' },
  ];

  return (
    <div className="schedule-container">
      <p className="banner">*All times Eastern</p>
      {schedule.map((item, index) => (
        <div key={index} className="schedule-card">
          <h3>{item.day}</h3>
          <p>{item.time}</p>
          <p>{item.show}</p>
        </div>
      ))}
    </div>
  );
};

Schedule.propTypes = {};

export default Schedule;