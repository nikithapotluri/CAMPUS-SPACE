import { userLoginContext } from './userLoginContext';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

//localStorage is used to stay logged in even after refreshing a page.

function UserLoginStore({ children }) {
  // login user state
  let [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);
  let [userLoginStatus, setUserLoginStatus] = useState(!!localStorage.getItem('currentUser')); // Boolean value based on localStorage
  let [err, setErr] = useState('');

  // login req
  async function loginUser(userCredObj) {
    try {
      let res = await fetch('https://campus-space-bend.vercel.app/user-api/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(userCredObj),
      });

      let usersList = await res.json();

      if (usersList.message !== 'login success') {
        // invalid credentials
        setCurrentUser(null);
        setUserLoginStatus(false);
        setErr('Invalid Username or Password');
        toast.error('Invalid Username or Password');
        localStorage.removeItem('currentUser'); // Remove any existing data
      } else {
        setCurrentUser(usersList.user);
        setUserLoginStatus(true);
        setErr('');
        localStorage.setItem('currentUser', JSON.stringify(usersList.user)); // Store user data in localStorage
        toast.success('Login Successful!');
      }
    } catch (error) {
      setErr(error.message);
    }
  }

  function logoutUser() {
    setCurrentUser(null);
    setUserLoginStatus(false);
    localStorage.removeItem('currentUser'); // Clear user data from localStorage on logout
  }

  // Automatically set login state from localStorage when component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser);
      setUserLoginStatus(true);
    }
  }, []);

  return (
    <userLoginContext.Provider value={{ currentUser, loginUser, logoutUser, userLoginStatus }}>
      {children}
    </userLoginContext.Provider>
  );
}

export default UserLoginStore;
