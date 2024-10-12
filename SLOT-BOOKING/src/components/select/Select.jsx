import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Select = ({ onSlotSelect, bookedSlots }) => {
  const intime = "09:00 am";
  const outtime = "05:00 pm";
  const [result, setResult] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);

  useEffect(() => {
    function calculateIntervals(startString, endString) {
      const start = moment(startString, 'hh:mm a');
      const end = moment(endString, 'hh:mm a');
      start.minutes(Math.ceil(start.minutes() / 15) * 15); // Round up to nearest 15 mins

      const currentTime = moment(); // Get current time
      const today = currentTime.isSame(start, 'day'); // Check if the current date is today

      const times = [];
      let current = moment(start);

      while (current < end) {
        const next = moment(current).add(1, 'hour');
        
        // If it's today, only allow times after the current time
        if (!today || current.isAfter(currentTime)) {
          times.push(`${current.format('hh:mm a')} - ${next.format('hh:mm a')}`);
        }

        current = next;
      }

      setResult(times);
    }

    calculateIntervals(intime, outtime);
  }, []);

  // Function to check if the slot is already booked
  const isSlotBooked = (time) => {
    return Array.isArray(bookedSlots) && bookedSlots.some(slot => slot.timeSlots.includes(time));
  };

  const handleSlotClick = (time) => {
    if (isSlotBooked(time)) {
      toast.warn('This time slot is already booked. Please choose a different slot.');
      return;
    }

    setSelectedSlots((prevSelectedSlots) => {
      const isSelected = prevSelectedSlots.includes(time);
      const newSelectedSlots = isSelected
        ? prevSelectedSlots.filter(slot => slot !== time)
        : [...prevSelectedSlots, time];

      onSlotSelect(newSelectedSlots);
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
            cursor: 'pointer', 
            backgroundColor: isSlotBooked(time) ? 'lightgray' : selectedSlots.includes(time) ? 'green' : 'white',
            color: isSlotBooked(time) ? 'red' : selectedSlots.includes(time) ? 'white' : 'black',
            pointerEvents: isSlotBooked(time) ? 'none' : 'auto',
          }}
          onClick={() => handleSlotClick(time)}
        >
          <Card.Body>
            <Card.Text>{time}</Card.Text>
          </Card.Body>
        </Card>
      )) : <p>No slots available.</p>}
    </div>
  );
};

export default Select;
