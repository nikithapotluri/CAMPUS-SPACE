import React, { useState, useEffect, useContext } from 'react';
import { userLoginContext } from '../../contexts/userLoginContext';
import { FaTrash } from 'react-icons/fa';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import './bookedSlotsPage.css'; // Adding custom styles

const BookedSlotsPage = () => {
  let { currentUser, userLoginStatus } = useContext(userLoginContext);
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    if (currentUser) {
      // Fetch booked slots for the current user by facultyid
      fetch(`https://campus-space-bend.vercel.app/user-api/bookedSlots/${currentUser.username}`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched Data:', data); // Log for debugging

          // Filter slots to only include those from today or later
          const today = new Date().toISOString().split('T')[0];
          const filteredSlots = data.payload.filter(slot => new Date(slot.date) >= new Date(today));
          setBookedSlots(filteredSlots);
        })
        .catch(error => console.error('Error fetching booked slots:', error));
    }
  }, [currentUser]);

  async function handleDelete(id) {
    try {
      // Make DELETE request to backend
      const response = await fetch(`https://campus-space-bend.vercel.app/user-api/bookedSlots/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Update state after deletion
        setBookedSlots(bookedSlots.filter(slot => slot._id !== id));
      } else {
        console.error('Error deleting slot:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting slot:', error);
    }
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Remove the event
    </Tooltip>
  );

  return (
    <div>
      <hr />
      {userLoginStatus === true ? (
        <div className='container mt-0'>
          <div className='d-flex flex-column align-items-center'>
            <h1 className='text-center text-black'>My Upcoming Slots</h1>
            {bookedSlots.length > 0 ? (
              <div className='table-responsive'>
                <table className='table table-bordered mt-4'>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Room Number</th>
                      <th>Event</th>
                      <th>Faculty Name</th>
                      <th>Faculty ID</th>
                      <th>Booked Time Slots</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookedSlots.map((slot) => (
                      <tr key={slot._id}>
                        <td>{slot.date}</td>
                        <td>{slot.roomNo}</td>
                        <td>{slot.event}</td>
                        <td>{slot.facultyName}</td>
                        <td>{slot.facultyid}</td>
                        <td>{Array.isArray(slot.timeSlots) ? slot.timeSlots.join(', ') : "No slots booked"}</td>
                        <td>
                          <OverlayTrigger
                            placement="right"
                            overlay={renderTooltip}
                          >
                            <span className='d-inline-block'>
                              <FaTrash 
                                className='text-danger cursor-pointer' 
                                onClick={() => handleDelete(slot._id)} 
                              />
                            </span>
                          </OverlayTrigger>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No booked slots found.</p>
            )}
          </div>
        </div>
      ) : (
        <h3 className='text-center text-danger'>You need to login again to access this page!</h3>
      )}
    </div>
  );
};

export default BookedSlotsPage;
