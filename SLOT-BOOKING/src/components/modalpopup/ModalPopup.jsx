import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ModalPopup.css';
import Select from '../select/Select'; 
import moment from 'moment'; // Import moment.js for date validation

const ModalPopup = ({ isOpen, onClose, selectedLab }) => {
  let navigate = useNavigate();

  const initialFormValues = {
    date: '',
    facultyName: '',
    facultyid: '',
    roomNo: '',
    event: '',
    timeSlots: [] // Add timeSlots to initial form values
  };

  const [values, setValues] = useState(initialFormValues);
  const [slotSelected, setSlotSelected] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setValues(initialFormValues); // Reset form values when modal is opened
    }
  }, [isOpen]);

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSlotSelect = (selectedSlots) => {
    setSlotSelected(selectedSlots.length > 0); // Check if any slot is selected
    setValues(prevValues => ({
      ...prevValues,
      timeSlots: selectedSlots // Update the timeSlots in state
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // Get the selected date and today's date
    const selectedDate = moment(values.date);
    const today = moment().startOf('day'); // Get today's date at the start of the day

    // Check if the selected date is in the past
    if (selectedDate.isBefore(today)) {
      toast.error("You cannot select a past date. Please choose a valid date.");
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
        let res = await fetch("http://localhost:3000/bookedSlots", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(values),
        });

        if (res.ok) {
          toast.success("Slot booked successfully!", {
            position: "top-center",
            autoClose: 2000, // Automatically close after 2 seconds
          });
          onClose();

          setTimeout(() => {
            navigate('/bookedslots');
          }, 2000); // Navigate after the toast is displayed
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
          <p>Choose your preferred time slot for {selectedLab}</p>
          <div className="overflow-auto">
            <Select onSlotSelect={handleSlotSelect} />
          </div>
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
                min={moment().format('YYYY-MM-DD')} // Disable past dates
              />
            </Form.Group>
            <Form.Group controlId="roomNo">
              <Form.Label>Room Number</Form.Label>
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

      {/* Toast notification */}
      <ToastContainer />
    </>
  );
};

export default ModalPopup;
