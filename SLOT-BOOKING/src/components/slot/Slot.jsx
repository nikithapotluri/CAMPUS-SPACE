import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import lab from "../pictures/lab.jpeg";
import seminarhall from "../pictures/seminar-hall.jpeg";
import audi from "../pictures/audi.jpeg";
import './Slot.css';
import ModalPopup from '../modalpopup/ModalPopup'; 

import { userLoginContext } from "../../contexts/userLoginContext";

function Slot() {
  let navigate = useNavigate();
  
  let { currentUser, loginUser, userLoginStatus} = useContext(userLoginContext);


  const userPhoto = currentUser?.profile_pic || 'https://png.pngtree.com/png-clipart/20191120/original/pngtree-outline-user-icon-png-image_5045523.jpg';

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


      {userLoginStatus===true?(
        <div className="container d-flex justify-content-center">
        <div className="card__container row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <article className="col card__article">
            <img src={lab} alt="Lab" className="card__img" style={{ height: '265px' }} />
            <div className="card__data shadow">
              <h2 className="card__title">LAB</h2>
              <Link to="/labs">
                <div className="btn border card__button">Book</div>
              </Link>
            </div>
          </article>

          <article className="col card__article">
            <img src={seminarhall} alt="Seminar Hall" className="card__img" />
            <div className="card__data shadow">
              <h2 className="card__title">SEMINAR HALL</h2>
              <Link to="/seminarHalls">
                <div className="btn border card__button">Book</div>
              </Link>
            </div>
          </article>

          <article className="col card__article">
            <img src={audi} alt="Auditorium" className="card__img" style={{ height: '265px' }} />
            <div className="card__data shadow">
              <h2 className="card__title">AUDITORIUM</h2>
              
              <div className="btn border card__button blue"  onClick={() => openModal('AUDITORIUM')}>Book</div>
              
            </div>
          </article>
        </div>

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

export default Slot;
