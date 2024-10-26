import React, { useState, useEffect, useContext } from 'react';
import { Table, Container, Form, Button, Row, Col } from 'react-bootstrap';
import './AllBookedSlots.css';
import { userLoginContext } from "../../contexts/userLoginContext";

const AllBookedSlots = () => {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [roomNo, setRoomNo] = useState(''); // Detailed room number filter
  const [facultyName, setFacultyName] = useState('');
  const [eventType, setEventType] = useState('');
  const [userID, setUserID] = useState(''); // New quick filter for userID
  const [roomNoQuick, setRoomNoQuick] = useState(''); // New quick filter for room number
  const [hasSubmitted, setHasSubmitted] = useState(false);

  let { userLoginStatus } = useContext(userLoginContext);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await fetch('https://campus-space-bend.vercel.app/user-api/bookedSlots');
        const data = await response.json();

        if (Array.isArray(data.payload)) {
          setBookedSlots(data.payload);
        } else {
          console.error("Unexpected data format:", data);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
        setLoading(false);
      }
    };
    fetchBookedSlots();
  }, []);

  const handleFilter = () => {
    let filtered;

    if (userID) {
      // Quick filter by userID
      filtered = bookedSlots.filter(slot => slot.facultyid === userID);
    } else if (roomNoQuick) {
      // Quick filter by room number
      filtered = bookedSlots.filter(slot => slot.roomNo === roomNoQuick);
    } else {
      // Apply detailed filters
      filtered = bookedSlots.filter(slot => {
        const slotDate = new Date(slot.date);
        const isDateInRange = startDate && endDate
          ? slotDate >= new Date(startDate) && slotDate <= new Date(endDate)
          : true;

        const isRoomMatch = roomNo ? slot.roomNo === roomNo : true;
        const isFacultyMatch = facultyName ? slot.facultyName.toLowerCase().includes(facultyName.toLowerCase()) : true;
        const isEventMatch = eventType ? slot.event.toLowerCase().includes(eventType.toLowerCase()) : true;

        return isDateInRange && isRoomMatch && isFacultyMatch && isEventMatch;
      });
    }

    setFilteredSlots(filtered);
    setHasSubmitted(true);
  };

  return (
    <div>
      <hr />
      {userLoginStatus === true ? (
        <Container className="mt-4">
          <h1 className="text-center text-black">All Booked Slots</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <Row className="mb-4 align-items-center">
                <Col lg={3} md={6} sm={12} className="mb-2">
                  <Form.Group controlId="startDate">
                    <Form.Label className='text-dark'><b>Start Date</b></Form.Label>
                    <Form.Control
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6} sm={12} className="mb-2">
                  <Form.Group controlId="endDate">
                    <Form.Label className='text-black'><b>End Date</b></Form.Label>
                    <Form.Control
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6} sm={12} className="mb-2">
                  <Form.Group controlId="roomNo">
                    <Form.Label className='text-black'><b>Room Number</b></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter room number"
                      value={roomNo}
                      onChange={(e) => setRoomNo(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6} sm={12} className="mb-2">
                  <Form.Group controlId="facultyName">
                    <Form.Label className='text-black'><b>Faculty Name</b></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter faculty name"
                      value={facultyName}
                      onChange={(e) => setFacultyName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6} sm={12} className="mb-2">
                  <Form.Group controlId="eventType">
                    <Form.Label className='text-black'><b>Event Type</b></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter event type"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6} sm={12} className="mb-2">
                  <Form.Group controlId="userID">
                    <Form.Label className='text-black'><b>Faculty ID</b></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter faculty ID"
                      value={userID}
                      onChange={(e) => setUserID(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6} sm={12} className="mb-2">
                  <Form.Group controlId="roomNoQuick">
                    <Form.Label className='text-black'><b>Room Number Quick Search</b></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Quickly search by room number"
                      value={roomNoQuick}
                      onChange={(e) => setRoomNoQuick(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6} sm={12} className="d-flex align-items-center">
                  <Button onClick={handleFilter} className="w-100 mt-3">Submit</Button>
                </Col>
              </Row>

              {hasSubmitted && (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Room Number</th>
                      <th>Faculty Name</th>
                      <th>Faculty ID</th>
                      <th>Event</th>
                      <th>Time Slots</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSlots.length > 0 ? (
                      filteredSlots.map((slot, index) => (
                        <tr key={index}>
                          <td>{slot.date}</td>
                          <td>{slot.roomNo}</td>
                          <td>{slot.facultyName}</td>
                          <td>{slot.facultyid}</td>
                          <td>{slot.event}</td>
                          <td>{Array.isArray(slot.timeSlots) ? slot.timeSlots.join(', ') : "No slots booked"}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center">No slots found for the selected filters</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </>
          )}
        </Container>
      ) : (
        <h3 className='text-center text-danger'>You need to login again to access this page!</h3>
      )}
    </div>
  );
};

export default AllBookedSlots;
