import "./Header.css";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import logo from "../pictures/Logo1.png";
import dp from "../pictures/dp.jpg"
import { userLoginContext } from "../../contexts/userLoginContext";
import { useContext, useState } from "react";

function Header() {
  let { currentUser, logoutUser, userLoginStatus } = useContext(userLoginContext);
  // State for showing user details dropdown
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center header p-1">
      {/* Logo on the left */}
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
      </div>

      {/* Navigation items on the right */}
      <ul className="nav fs-5">
        <li className="nav-item ">
          <Link to="/" className="nav-link">
            <HiOutlineHome className="fs-3 text-danger" />
            <div className="black" style={{ color: 'black' }}>
              Home
            </div>
          </Link>
        </li>


        <li className="nav-item ">
          <Link to="/about" className="nav-link">
            <AiOutlineTeam className="fs-3 text-danger " />
            <div className="black" style={{ color: 'black' }}>
              About
            </div>
          </Link>
        </li>

        <li className="nav-item ">
              <Link to="/slot" className="nav-link">
                <FaRegBookmark className="fs-3 text-danger" />
                <div className="black" style={{ color: 'black' }}>
                  Book
                </div>
              </Link>
            </li>

        <li className="nav-item ">
          <Link to="/allbookedslots" className="nav-link">
            <FaRegBookmark className="fs-3 text-danger " />
            <div className="black" style={{ color: 'black' }}>
              Slots
            </div>
          </Link>
        </li>

        {userLoginStatus ? (
          
          <div className="user-details shadow">
          <div 
            className="user-info"
            onClick={() => setShowDetails(!showDetails)} 
            onMouseLeave={() => setShowDetails(false)}
          >
            <p className="d-flex align-items-center mb-0">
              <img src={currentUser?.profile_pic || {dp} } className="me-2" />
              <FaChevronDown className="ms-2" />
            </p>
            {showDetails && currentUser && (
              <div className="container mt-2 p-3 bg-light border rounded" >
                <p className="row"><strong className="col-2">Name</strong>  <strong className="col-1">:</strong> <p className="col-9">{currentUser.name}</p></p>
                <p className="row"><strong className="col-2">ID</strong>    <strong className="col-1">:</strong> <p className="col-9">{currentUser.username}</p></p>
                <p className="row"><strong className="col-2">Email</strong> <strong className="col-1">:</strong> <p className="col-9">{currentUser.email}</p></p>
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
              <div className="black" style={{ color: 'black' }}>Login</div>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
