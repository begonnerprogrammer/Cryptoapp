import React from 'react'
import "../styles/home.css"
import { NavLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../App'
const Main = () => {
  const navigate = useNavigate();
  const logout=()=>{
    fetch("/logout").then(res=>res.json())
    .then(data=>{
      if(data==="success")
      {
        alert("logout succesffully")
        navigate("/")
        window.location.reload()
    }
  }
  )
  .catch(err => console.log(err))
  }
    // using conntextapi
    const username=useContext(userContext);
  return (
    <div className=''>
      <div className='bg-gray-300'>
        <ul className='list flex items-center md:justify-center '>
            <NavLink to={"/"}> <li className=' md:p-5 hover:text-white transition duration-500 md:text-2xl sm:text-[12px]'>Home</li></NavLink>
          <NavLink to={"/posts"}><li className='md:p-5 hover:text-white transition duration-500 md:text-2xl sm:text-[12px]'>Blog</li></NavLink>
          <NavLink to={"/contact"}><li className='md:p-5 hover:text-white transition duration-500 md:text-2xl sm:text-[12px]'>Contact</li></NavLink>   
          <NavLink to={"/about"}><li className='md:p-5 hover:text-white transition duration-500 md:text-2xl sm:text-[12px]'>About Me</li></NavLink> 
          {
            username.email || username.username ? "":<NavLink to={"/signup"}><li className='md:p-5 hover:text-white transition duration-500 md:text-2xl sm:text-[12px]'>Signup</li></NavLink>
          }
         

    { 
              username.email || username.username ?<li onClick={logout} className='md:p-5 hover:text-white transition duration-500 md:text-2xl sm:text-[12px]'>Logout</li>:<NavLink to={"/login"}><li className='p-5 hover:text-white transition duration-500 md:text-2xl sm:text-[40px]'>Login</li></NavLink>
             }




          {/* <NavLink to={"/user"}><li className='p-5 hover:text-white transition duration-500 md:text-2xl sm:text-[12px]'>User</li></NavLink>           */}
        </ul>
      </div>
    </div>
  )
}

export default Main




