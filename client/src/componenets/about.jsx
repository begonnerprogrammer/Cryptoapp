import React, { useEffect } from 'react'
import "../styles/about.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../App'
const About = () => {
  const user=useContext(userContext);
  const location=useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/home")
      .then(res => res.json())
      .then(data => {
        if (data === "success") {
          // alert("YOU ARE AUTHORIZED")
          navigate("/about")
         
        }
        if (data === "the token is not there") {
          navigate("/")
          // alert("Sign In First")
   
        }
      })
      .catch(err => console.log(err))
  }, [""])
  return (
    <div className='relative h-[100%] mt-3'>
     <div className='flex items-center justify-evenly'>
      <div className='mt-4'>
      <h1 className='md:text-xl'>M.Usman Tahir</h1>
      <h3 className='text-blue-500 mt-3' >Web developer.</h3>
      </div>
     
      
    <Link to={"/contact"}><button className='button border-2  border-black border-solid rounded-md p-1  hover:bg-black hover:text-white transition duration-500'>Contact</button></Link>  
     </div>
     <div className='info absolute   mt-12 '>
        <h1 className='text-blue-500'>About</h1>
        <div className='mt-4'>
          <div className='flex items-center'>
        <h1 className='title md:mr-[300px]'>Name</h1>
        <h1 className='description'>M.USMAN TAHIR</h1>
   </div>
   <div className='flex items-center mt-2'>
        <h1 className='title md:mr-[305px]'>Email</h1>
        <h1  className='description'>ut027908@gmail.com</h1>
   </div>
   <div className='flex items-center mt-2'>
        <h1 className='title md:mr-[300px]'>Phone</h1>
        <h1  className='description'>03242502363</h1>
   </div>
   <div className='flex items-center mt-2'>
        <h1 className='title md:mr-[270px]'>Profession</h1>
        <h1  className='last-description'><span className='text-blue-500'>FULL STACK</span> Web developer</h1>
   </div>
        
        </div>










      </div>
    </div>
  //   <div className='mern1  relative  flex items-center justify-center text-center sm:text-[10px] md:text-xl'>
  //   <h1 className='absolute top-20 mern1'>
  //      Hello!My name is <span className='text-blue-500 sm:text-xl md:text-2xl'>USMAN</span> I am a <span className='text-blue-500 sm:text-xl md:text-2xl'> FULL-STACK-DEVELOPER</span>  and this is my complete <span className='text-blue-500 sm:text-xl md:text-2xl'>MERN-STACK-PROJECT</span>.
  //   </h1>
  //   <h1 className='absolute top-36 mt-6'>
  //     <h1 className='mt-5'>ABOUT THIS APP:</h1>
  //     &#x2022;Login <span className='text-blue-500 sm:text-xl md:text-2xl'>Authentication </span>at User Page </h1>
  //   <h1 className='absolute top-60 '>&#x2022; <span className='text-blue-500 sm:text-xl md:text-2xl'>Logout </span>functionality after you  logged in Successfully</h1>
  //     <div className='absolute top-80 mt-8 text-start'>
  //       <h1 >Also My Other   <span className='text-blue-500 sm:text-xl md:text-2xl'>Projects</span>:</h1>
  //  <ul className='text-start'>
  //   <li>&#x2022;Movie App (using <span className='text-blue-500 sm:text-xl md:text-xl'>Next.js && Redux</span>)</li>
  //   <li>&#x2022;Portfolio</li>
  //  </ul>

  //     </div>
   
  // </div>
  )
}

export default About;
