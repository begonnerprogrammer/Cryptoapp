import React, { useEffect } from 'react'
import { useContext } from 'react'
import { userContext } from './App'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
const User = () => {
    // using conntextapi
    const username=useContext(userContext);
    const location=useLocation();
    const navigate = useNavigate();
      //authentication at page reload use effect
  useEffect(() => {
    fetch("/home")
      .then(res => res.json())
      .then(data => {
        if (data === "success") {
          alert("YOU ARE AUTHORIZED")
          navigate("/user")
         
        }
        if (data === "the token is not there") {
          navigate("/")
          // alert("Sign In First")
   
        }
      })
      .catch(err => console.log(err))
  }, [""])

  return (
    <div className='relative flex items-center justify-center text-center'>
      <div className='absolute top-32'>
      <h1 className='  sm:text-xl md:text-3xl'>You Are Authenticated!</h1>
    <h1 className=' mt-5 sm:text-xl md:text-4xl '><span className='text-red-500'>&#10084;</span>Thanks for logging In  {
              username.email || username.username ? `${username.username}` : "User"
            }.</h1>
    <button className='border-2 border-black border-solid rounded-md sm:text-xl md:text-xl p-2 hover:bg-black hover:text-white transition duration-500 mt-8'>Logout</button>
      </div>
    </div>
  )
}

export default User;
