import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Card } from 'react-bootstrap';

const Select = ({ onSlotSelect }) => {
  const intime = "09:00 am";
  const outtime = "05:00 pm";
  const [result, setResult] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  useEffect(() => {
    function calculateIntervals(startString, endString) {
      const start = moment(startString, 'hh:mm a');
      const end = moment(endString, 'hh:mm a');
      start.minutes(Math.ceil(start.minutes() / 15) * 15);
                
      const times = [];
      let current = moment(start);

      while (current < end) {
        const next = moment(current).add(1, 'hour');
        times.push(`${current.format('hh:mm a')} - ${next.format('hh:mm a')}`);
        current = next;
      }

      setResult(times);
    }

    calculateIntervals(intime, outtime);
  }, []);

  const handleSlotClick = (time) => {
    setSelectedSlots((prevSelectedSlots) => {
      const isSelected = prevSelectedSlots.includes(time);
      const newSelectedSlots = isSelected
        ? prevSelectedSlots.filter(slot => slot !== time)
        : [...prevSelectedSlots, time];

      onSlotSelect(newSelectedSlots.length > 0); // Notify parent about selection
      return newSelectedSlots;
    });
  };

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {result.length > 0 ? result.map((time, index) => (
        <Card 
          key={index} 
          className="m-2 text-center shadow-sm" 
          style={{ 
            width: '110px', 
            borderRadius: '8px', 
            backgroundColor: selectedSlots.includes(time) ? '#4caf50' : '#f8f9fa' 
          }}
        >
          <Card.Body 
            className="p-2" 
            onClick={() => handleSlotClick(time)} // Trigger slot selection
            style={{ cursor: 'pointer' }} // Make it look clickable
          >
            <Card.Text 
              className="mb-0" 
              style={{ color: selectedSlots.includes(time) ? '#fff' : '#4caf50', fontWeight: 'bold', fontSize: '14px' }}
            >
              {time}
            </Card.Text>
          </Card.Body>
        </Card>
      )) : <p>No slots available</p>}
    </div>
  );
};

export default Select;
