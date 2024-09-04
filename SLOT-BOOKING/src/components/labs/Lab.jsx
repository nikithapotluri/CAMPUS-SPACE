import React, { useState, useContext } from 'react';

import aiml from "../pictures/aiml.jpeg";
import ad from "../pictures/ad.jpeg";
import skill from "../pictures/skill.jpeg";

import { userLoginContext } from '../../contexts/userLoginContext';
import ModalPopup from '../modalpopup/ModalPopup'; 
import './Lab.css';

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
              <img src={aiml} alt="208 Lab" className="card-img-top" />
              <div className="overlay card-body text-center">
                <b>AI and ML LAB</b>
                <p className="lead">208</p>
                <div className="btn border" onClick={() => openModal('AI and ML LAB')}>Book</div>
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-center">
            <div className="card shadow-md w-75 h-100">
              <img src={ad} alt="216 Lab" className="card-img-top" />
              <div className="overlay card-body text-center">
                <b>APPLICATION DEVELOPMENT LAB</b>
                <p className="lead">216</p>
                <div className="btn border" onClick={() => openModal('APPLICATION DEVELOPMENT LAB')}>Book</div>
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-center">
            <div className="card shadow-md w-75 h-100">
              <img src={skill} alt="224 Lab" className="card-img-top" />
              <div className="overlay card-body text-center">
                <b>PROGRAMMING LANGUAGES LAB</b>
                <p className="lead">224</p>
                <div className="btn border" onClick={() => openModal('PROGRAMMING LANGUAGES LAB')}>Book</div>
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
