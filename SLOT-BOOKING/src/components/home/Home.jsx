import React, { useContext, useState } from 'react';
import './Home.css'; 
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { FaRegBookmark } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { PiCursorClick } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import logo from "../pictures/Logo1.png";
import { userLoginContext } from "../../contexts/userLoginContext";

function Home() {
  let { currentUser, logoutUser, userLoginStatus } = useContext(userLoginContext);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <div className='full-bg'>
        {/* HEADER OF HOME */}
        <div className="d-flex flex-wrap justify-content-between align-items-center header p-1">
          {/* Logo on the left */}
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo-image" />
            </Link>
          </div>

          {/* Navigation items on the right */}
          <ul className="nav fs-5">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <HiOutlineHome className="fs-3 text-danger" /> <div className='white'>Home</div>
              </Link>
            </li>

            <li className="nav-item ">
              <Link to="/about" className="nav-link">
                <AiOutlineTeam className="fs-3 text-danger" />
                <div className="text-white">
                  About
                </div>
              </Link>
            </li>

            <li className="nav-item ">
              <Link to="/slot" className="nav-link">
                <PiCursorClick className="fs-3 text-danger" />
                <div className="white" style={{ color: 'white' }}>
                  Book
                </div>
              </Link>
            </li>

            <li className="nav-item ">
              <Link to="/allbookedslots" className="nav-link">
                <FaRegBookmark className="fs-3 text-danger" />
                <div className="white" style={{ color: 'white' }}>
                  Slots
                </div>
              </Link>
            </li>

            {userLoginStatus ? (
              // User details dropdown
              <div className="user-details shadow">
                <div 
                  className="user-info"
                  onClick={() => setShowDetails(!showDetails)}
                  onMouseLeave={() => setShowDetails(false)}
                  style={{ color: 'black' }} // Setting dropdown text to black
                >
                  <p className="d-flex align-items-center mb-0">
                    <img src={currentUser?.profile_pic || logo} className="me-2" alt="User" />
                    <FaChevronDown className="ms-2" style={{ color: 'black' }} /> {/* Dropdown symbol in black */}
                  </p>
                  
                  {showDetails && currentUser && (
                    <div className="container mt-2 p-3 bg-light border rounded">
                      <p className="row">
                        <strong className="col-2">Name</strong>
                        <strong className="col-1">:</strong>
                        <span className="col-9">{currentUser.name}</span>
                      </p>
                      <p className="row">
                        <strong className="col-2">ID</strong>
                        <strong className="col-1">:</strong>
                        <span className="col-9">{currentUser.username}</span>
                      </p>
                      <p className="row">
                        <strong className="col-2">Email</strong>
                        <strong className="col-1">:</strong>
                        <span className="col-9">{currentUser.email}</span>
                      </p>
                      <Link to="/bookedslots" className="btn btn-secondary mx-2">
                        My Slots
                      </Link>
                      <button className="btn btn-secondary" onClick={logoutUser}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  <FiLogIn className="fs-3 text-danger" />
                  <div className="white" style={{ color: 'white' }}>Login</div>
                </Link>
              </li>
            )}
          </ul>
        </div>

        {/* HOME */}
        <div className="title-offset d-flex flex-column justify-content-center align-items-center vh-100 text-center py-5">
          <div className="row w-100">
            <h1 className="display-1 title-offset" style={{ color: 'white' }}>Campus Space</h1>
            <h3 className='dynamic-texts'>
              <span>Book. Manage. Succeed</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
