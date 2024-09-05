import React, { useState, useEffect, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';

import { FaTrash } from 'react-icons/fa';
import { Tooltip, OverlayTrigger } from 'react-bootstrap'; 

const BookedSlotsPage = () => {
  
    let { currentUser, loginUser, userLoginStatus} = useContext(userLoginContext);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    if (currentUser) {
      // Fetch booked slots for the current user
      fetch(`http://localhost:3000/bookedSlots?facultyid=${currentUser.username}`)
        .then(response => response.json())
        .then(data => setBookedSlots(data))
        .catch(error => console.error('Error fetching booked slots:', error));
    }
  }, [currentUser]);

  async function handleDelete  (id){
    // Delete the slot from the backend
    try {
      await fetch(`http://localhost:3000/bookedSlots/${id}`, {
        method: 'DELETE',
      });
      // Update the local state
      setBookedSlots(bookedSlots.filter(slot => slot.id !== id));
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Remove the event
    </Tooltip>
  );

  return (
    <div>
      <hr />
      {userLoginStatus===true?(
      <div className='container mt-0'>
        <div className='d-flex flex-column align-items-center'>
          <h1 className='text-center text-black'>Your Booked Slots</h1>
          {bookedSlots.length > 0 ? (
            <table className='table table-bordered mt-4'>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Room Number</th>
                  <th>Event</th>
                  <th>Faculty Name</th>
                  <th>Faculty ID</th>
                  <th>Actions</th> 
                </tr>
              </thead>
              <tbody>
                {bookedSlots.map((slot) => (
                  <tr key={slot.id}>
                    <td>{slot.date}</td>
                    <td>{slot.roomNo}</td>
                    <td>{slot.event}</td>
                    <td>{slot.facultyName}</td>
                    <td>{slot.facultyid}</td>
                    <td>
                      <OverlayTrigger
                        placement="right"
                        overlay={renderTooltip}
                      >
                        <span className='d-inline-block'>
                          <FaTrash 
                            className='text-danger cursor-pointer' 
                            onClick={() => handleDelete(slot.id)} 
                          />
                        </span>
                      </OverlayTrigger>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No booked slots found.</p>
          )}
        </div>
      </div>

):
(
  <h3 className='text-center text-danger'>You need to login again to access this page!</h3>
)
}
    </div>


  );
};

export default BookedSlotsPage;
