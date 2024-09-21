import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ModalPopup.css';
import Select from '../select/Select'; 
import moment from 'moment';

const ModalPopup = ({ isOpen, onClose, selectedLab }) => {
  let navigate = useNavigate();

  const initialFormValues = {
    date: '',
    facultyName: '',
    facultyid: '',
    roomNo: '',
    event: '',
    timeSlots: [] 
  };

  const [values, setValues] = useState(initialFormValues);
  const [bookedSlots, setBookedSlots] = useState([]); // State to store booked slots
  const [slotSelected, setSlotSelected] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setValues(initialFormValues); // Reset form values when modal is opened
    }
  }, [isOpen]);

  useEffect(() => {
    if (values.date && values.roomNo) {
      fetchBookedSlots(values.date, values.roomNo); // Fetch booked slots when a date and room number are selected
    }
  }, [values.date, values.roomNo]);

  // Function to fetch booked slots for the selected date and room number
  const fetchBookedSlots = async (date, roomNo) => {
    try {
      let res = await fetch(`https://campus-space-bend.vercel.app/user-api/bookedSlots?date=${date}&roomNo=${roomNo}`);
      if (res.ok) {
        let data = await res.json();
        setBookedSlots(data.payload);
      } else {
        toast.error("Failed to fetch booked slots.");
      }
    } catch (error) {
      console.error("Error fetching booked slots:", error);
      toast.error("Error occurred while fetching booked slots.");
    }
  };

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSlotSelect = (selectedSlots) => {
    setSlotSelected(selectedSlots.length > 0);
    setValues(prevValues => ({
      ...prevValues,
      timeSlots: selectedSlots
    }));
  };

  // Function to check if any selected time slot clashes with already booked slots
  const isSlotClashing = (selectedSlots, bookedSlots) => {
    for (let bookedSlot of bookedSlots) {
      for (let bookedTime of bookedSlot.timeSlots) {
        if (selectedSlots.includes(bookedTime)) {
          return true; // Return true if a clash is detected
        }
      }
    }
    return false; // No clash detected
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const selectedDate = moment(values.date);
    const today = moment().startOf('day'); 

    if (selectedDate.isBefore(today)) {
      toast.error("You cannot select a past date. Please choose a valid date.");
      return;
    }

    if (slotSelected && isSlotClashing(values.timeSlots, bookedSlots)) {
      toast.error("Selected time slots are already booked. Please choose different slots.");
      return;
    }

    if (
      values.date &&
      values.facultyName &&
      values.facultyid &&
      values.roomNo &&
      values.event &&
      slotSelected
    ) {
      try {
        let res = await fetch("https://campus-space-bend.vercel.app/user-api/book-slot", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        });

        if (res.ok) {
          toast.success("Slot booked successfully!", {
            position: "top-center",
            autoClose: 2000, 
          });
          onClose();

          setTimeout(() => {
            navigate('/bookedslots');
          }, 2000);
        } else {
          toast.error("Failed to book the slot. Please try again.");
        }
      } catch (error) {
        console.error('Error during submission:', error);
        toast.error("An error occurred. Please try again.");
      }
    } else {
      toast.warn("Please fill all fields and select a slot.");
    }
  };

  return (
    <>
      <Modal show={isOpen} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book Slot for {selectedLab}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="facultyName">
              <Form.Label>Faculty Name</Form.Label>
              <Form.Control
                type="text"
                name="facultyName"
                value={values.facultyName}
                onChange={handleChanges}
                placeholder="Enter Faculty Name"
                required
              />
            </Form.Group>
            <Form.Group controlId="facultyid">
              <Form.Label>Faculty ID</Form.Label>
              <Form.Control
                type="text"
                name="facultyid"
                value={values.facultyid}
                onChange={handleChanges}
                placeholder="Enter Faculty ID"
                required
              />
            </Form.Group>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={values.date}
                onChange={handleChanges}
                required
                min={moment().format('YYYY-MM-DD')}
              />
            </Form.Group>
            <Form.Group controlId="roomNo">
              <Form.Label>Room Number (For auditorium, enter "auditorium")</Form.Label>
              <Form.Control
                type="text"
                name="roomNo"
                value={values.roomNo}
                onChange={handleChanges}
                placeholder="Enter Room Number"
                required
              />
            </Form.Group>
            <Form.Group controlId="event">
              <Form.Label>Event</Form.Label>
              <Form.Control
                type="text"
                name="event"
                value={values.event}
                onChange={handleChanges}
                placeholder="Enter Event Name"
                required
              />
            </Form.Group>
          </Form>
          <p>Choose your preferred time slot for {selectedLab}</p>
          <div className="overflow-auto">
            <Select onSlotSelect={handleSlotSelect} bookedSlots={bookedSlots} />
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" onClick={onClose} className="mx-2">
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} className="mx-2">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default ModalPopup;
