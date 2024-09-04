import {React, useContext, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiOutlineHome } from "react-icons/hi";
import { FiLogIn } from "react-icons/fi";
import logo from "../pictures/Logo1.png";
import { userLoginContext } from "../../contexts/userLoginContext";

function Login() {
  let { register, handleSubmit, formState: {errors} } = useForm();
  let navigate = useNavigate();
  
  let { loginUser, userLoginStatus} = useContext(userLoginContext);

  function onUserLogin(userCred) {
    //userCred.preventDefault();  //used to not lose data when refreshed
    loginUser(userCred);
  }

  useEffect(() => {
    if (userLoginStatus === true) {
      
      setTimeout(()=>{
        navigate("/slot");
      },2000);

    }
  }, [userLoginStatus]);


  return (
    <div>
      <div className="full-bg-login">
        <section>
          {/* HEADER */}
          <div className="d-flex flex-wrap justify-content-between align-items-center header p-1">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="Logo" className="logo-image" />
              </Link>
            </div>
            <ul className="nav fs-5">
              <li className="nav-item">
                <Link to="/" className="nav-link" style={{ color: 'white' }}>
                  <HiOutlineHome className="fs-3 text-danger" /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link" style={{ color: 'white' }}>
                  <FiLogIn className="fs-3 text-danger" /> Login
                </Link>
              </li>
            </ul>
          </div>

          {/* LOGIN PAGE STARTS HERE */}
          <div className="form-box d-flex justify-content-center align-items-center vh-100">
            <div className="login-container glass-effect p-4">
              <h2 className="text-center">Login</h2>
              <form onSubmit={handleSubmit(onUserLogin)} className='d-flex justify-content-center flex-wrap'>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    {...register('username')}
                    className="form-control"
                    id="username"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    {...register('password')}
                    className="form-control"
                    id="password"
                  />
                </div>

                <br />

                <button
                  type="submit"
                  className="btn btn-login w-100"
                  style={{ backgroundColor: 'transparent', color: 'white', border: '2px solid white' }}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
