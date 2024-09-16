import React from 'react';
import './Home.css'; 

import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";


import logo from "../pictures/Logo1.png";
import side1 from "../pictures/Sitting.png";
import side2 from "../pictures/Standing.png";

import { CiLogout } from "react-icons/ci";
import { IoMdInformationCircle } from "react-icons/io";
//import { userLoginContext } from "../../contexts/userLoginContext";
import { useContext } from "react";

function Home() {
  return (


    <div>
      <div className='full-bg'>

    {/*HEADER OF HOME*/}

    <div className="d-flex flex-wrap justify-content-between align-items-center header p-1">
      {/* Logo on the left */}
      <div className="logo">
        <Link to="/">
        <img src={logo} alt="Logo" className="logo-image"  />
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
          <Link to="/allbookedslots" className="nav-link">
            <FaRegBookmark className="fs-3 text-danger " />
            <div className="text-white" >
              Slots
            </div>
          </Link>
        </li>

        <li className="nav-item ">
          <Link to="/about" className="nav-link">
            <AiOutlineTeam className="fs-3 text-danger " />
            <div className="text-white" >
              About
            </div>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            <FiLogIn className="fs-3 text-danger" /> <div className='white'>Login</div>
          </Link>
        </li>

      </ul>
    </div>

    


    {/* HOME */}
    <div className="title-offset d-flex flex-column justify-content-center align-items-center vh-100 text-center py-5">
     
        <div className="row w-100">
          
            <h1 className="display-1 title-offset " style={{ color: 'white' }}>Campus Space</h1>
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
