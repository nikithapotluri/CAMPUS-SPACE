import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, Container, Form, Button, Row, Col } from 'react-bootstrap';
import './AllBookedSlots.css';
import { userLoginContext } from "../../contexts/userLoginContext";

const AllBookedSlots = () => {
  const [bookedSlots, setBookedSlots] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  let { userLoginStatus } = useContext(userLoginContext);

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await axios.get('http://localhost:3000/bookedSlots');
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const filteredData = response.data.filter(slot => slot.date >= today);
        setBookedSlots(filteredData);
        setFilteredSlots(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
        setLoading(false);
      }
    };
    fetchBookedSlots();
  }, []);

  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = bookedSlots.filter(slot => {
        const slotDate = new Date(slot.date);
        return slotDate >= new Date(startDate) && slotDate <= new Date(endDate);
      });
      setFilteredSlots(filtered);
    } else {
      setFilteredSlots(bookedSlots);
    }
  };

  return (
    <div>
      <hr />
      {userLoginStatus === true ? (
        <Container className="mt-4">
          <h2 className="text-center text-black">All Booked Slots</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <Row className="mb-4 align-items-center">
                <Col lg={4} md={6} sm={12} className="mb-2 mb-lg-0">
                  <Form.Group controlId="startDate">
                    <Form.Label className='text-dark'><b>Start Date</b></Form.Label>
                    <Form.Control
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} md={6} sm={12} className="mb-2 mb-lg-0">
                  <Form.Group controlId="endDate">
                    <Form.Label className='text-black'><b>End Date</b></Form.Label>
                    <Form.Control
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg={4} md={12} sm={12} className="d-flex align-items-center">
                  <Button onClick={handleFilter} className="w-100">Submit</Button>
                </Col>
              </Row>

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
                      <td colSpan="6" className="text-center">No slots found for the selected date range</td>
                    </tr>
                  )}
                </tbody>
              </Table>
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
