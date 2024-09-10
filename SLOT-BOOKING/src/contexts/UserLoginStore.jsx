import {userLoginContext} from './userLoginContext'
import {useState} from 'react'
import { toast } from 'react-toastify';

function UserLoginStore({children}) {
  //login user state
  let [currentUser,setCurrentUser]=useState(null)
  let [userLoginStatus, setUserLoginStatus]=useState(false)
  let [err, setErr] = useState("");


  //login req
  async function loginUser(userCredObj){
    try{
    let res=await fetch('http://localhost:4000/user-api/login',
      {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(userCredObj)
      }
    )
    
    let usersList=await res.json();
    if(usersList.message!='login success'){
        //invalid credentials
        setCurrentUser(null)
        setUserLoginStatus(false)
        setErr('Invalid Username or Password')
        toast.error('Invalid Username or Password')
    }
    else{
        setCurrentUser(usersList.user)
        setUserLoginStatus(true)
        setErr('')
        toast.success('Login Successful !')
    }
  }
  catch(error){
    setErr(error.message)
  }
  }

  function logoutUser(){
    setCurrentUser({})
    setUserLoginStatus(false)
  }

  return (
    <userLoginContext.Provider value={{currentUser, loginUser, logoutUser, userLoginStatus}}>
        {children}
    </userLoginContext.Provider>
  )
}

export default UserLoginStore