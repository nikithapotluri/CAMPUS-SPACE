import React, { useState, useContext } from 'react';

import audi1 from "../pictures/audi1.jpeg";
import audi2 from "../pictures/audi2.jpeg";

import { userLoginContext } from '../../contexts/userLoginContext';
import ModalPopup from '../modalpopup/ModalPopup'; 
import './SeminarHall.css';

function Lab() {
  // Context
  const { currentUser, loginUser, userLoginStatus } = useContext(userLoginContext);
  // State for showing user details dropdown
  const [showDetails, setShowDetails] = useState(false);

  // State for modal and selected lab
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);

  const openModal = (lab) => {
    setSelectedLab(lab);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLab(null);
  };

  return (
    <div>
      <hr />

      {/* CARDS */}

      {userLoginStatus===true?(
      <div className="container d-flex justify-content-center">

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center g-4">
          <div className="col d-flex justify-content-center">
            <div className="card shadow-md w-75 h-100">
              <img src={audi1} alt="113 Hall" className="card-img-top" />
              <div className="overlay card-body text-center">
                <b>113 HALL</b>
                <br />
                <div className="btn border" onClick={() => openModal('113 HALL')}>Book</div>
              </div>
            </div>
          </div>

          <div className="col d-flex justify-content-center">
            <div className="card shadow-md w-75 h-100">
              <img src={audi2} alt="270 Hall" className="card-img-top" />
              <div className="overlay card-body text-center">
                <b>270 HALL</b>
                <br />
                <div className="btn border" onClick={() => openModal('270 HALL')}>Book</div>
              </div>
            </div>
          </div>
          
        </div>

      {/* Modal Popup */}
      <ModalPopup isOpen={isModalOpen} onClose={closeModal} selectedLab={selectedLab} />
          
      </div>

):
(
  <h3 className='text-center text-danger'>You need to login again to access this page!</h3>
  
)
}
    </div>
  );
}

export default Lab;
