import React from 'react'
import "../styles/page.css"
import { Link } from 'react-router-dom'
import { FaReact } from "react-icons/fa6";
import { FaNodeJs } from "react-icons/fa6";
import { BiLogoMongodb } from "react-icons/bi";
import { SiExpress } from "react-icons/si";
import { useContext } from 'react'
import { userContext } from '../App'
// {



// }

const Page = () => {
  const username=useContext(userContext);
  return (
    <div className='main mernstack relative h-100% flex items-center justify-center sm:text-xl md:text-3xl'>
     <div className='absolute top-32 flex'>
     <FaReact className='text-blue-500 animate-bounce' />
      <FaNodeJs className='text-yellow-500 animate-bounce  delay-200'  />
      <BiLogoMongodb className='text-green-500 animate-bounce delay-300'  />
      <SiExpress  className='text-black animate-bounce delay-400' />
     </div>
      <h1 className='absolute top-44 animation-ping tracking-normal'>Welcome! {
   username.email || username.username ? `${username.username}` : ""
      } TO MY Complete <span className='text-blue-500 sm:text-xl md:text-4xl'>MERN-STACK BLOG APP</span></h1>
      <div  className='absolute top-56 mt-4'> 
      {
   username.email || username.username ?  "" :  <Link to={"/login"}><button className=' button border-2 border-black border-solid rounded-md md:text-xl p-2 hover:bg-black hover:text-white transition duration-500 '>Login</button></Link> 
      }
    
     <Link to={"/posts"}>
     <button className='button border-2 border-black border-solid rounded-md md:text-xl p-2 hover:bg-black hover:text-white transition duration-500 ml-2'>Blog</button>
     </Link>
     
      </div>
  
    </div>
  )
}

export default Page
