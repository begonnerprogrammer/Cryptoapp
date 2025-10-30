"use client"
import React, { useState } from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa6";
import { CiLocationOn } from "react-icons/ci";
import "../styles/contact.css"
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { userContext } from '../App'
const Contact = () => {
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [subject,setSubject]=useState("");
const [massage,setMassage]=useState("");
const username=useContext(userContext);
const navigate=useNavigate();
  const submit=async(e)=>{
    e.preventDefault();
    const res=await fetch('/contact',{
  
      //rrules to write
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,email,massage,subject,
      })
    })
   
    const data=await res.json();
   
    if(data.status===422 || !data){
      console.log("Invalid")
    }
    else {
      console.log("Valid")
      navigate("/")
      alert("Thank You! Form Submitted")
    }
  }


  return (
  <div className='main h-[100%] flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-6 justify-evenly mx-auto items-start snap-center'>

  <h3 className='absolute top-8 uppercase tracking-[20px] text-blue-500 md:text-xl'>Contact</h3>

  <div className='flex flex-col md:flex-row mt-20 w-full justify-between items-start space-y-8 md:space-y-0 md:space-x-10'>

    {/* Left side: Contact Info */}
    <div className='flex flex-col space-y-6 md:w-1/3'>
      <h4 className='text-md md:text-xl font-semibold text-gray-800'>
        I have got just what you need.{" "}
        <span className='underline decoration-blue-500 decoration-2 underline-offset-4 text-blue-600'>Let's Talk.</span>
      </h4>

      <div className='space-y-4'>
        <div className='flex items-center space-x-4 hover:text-blue-500 transition duration-300 cursor-pointer'>
          <FaPhoneAlt className='text-blue-500 w-5 h-5 animate-pulse' />
          <p className='text-lg font-medium text-gray-700'>Phone</p>
        </div>
        <div className='flex items-center space-x-4 hover:text-blue-500 transition duration-300 cursor-pointer'>
          <FaRegEnvelope className='text-blue-500 w-5 h-5' />
          <p className='text-lg font-medium text-gray-700'>Email</p>
        </div>
        <div className='flex items-center space-x-4 hover:text-blue-500 transition duration-300 cursor-pointer'>
          <CiLocationOn className='text-blue-500 w-6 h-6' />
          <p className='text-lg font-medium text-gray-700'>Address</p>
        </div>
      </div>
    </div>

    {/* Right side: Contact Form */}
    <form
      className='flex flex-col space-y-3 max-w-[500px] w-full md:w-2/3 bg-gray-50 p-6 md:bg-gray-100 rounded-lg shadow-md'
      onSubmit={submit}
      method='POST'
    >
      {/* Name + Email row */}
      <div className='md:flex md:space-x-2 w-full'>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Name'
          type='text'
          required
          className='w-full p-3 rounded-md border border-gray-300 placeholder:italic placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2 md:mb-0'
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          type='email'
          required
          className='w-full p-3 rounded-md border border-gray-300 placeholder:italic placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
      </div>

      {/* Subject */}
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder='Subject'
        type='text'
        required
        className='w-full p-3 rounded-md border border-gray-300 placeholder:italic placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400'
      />

      {/* Message */}
      <textarea
        value={massage}
        onChange={(e) => setMassage(e.target.value)}
        placeholder='Message'
        rows='4'
        required
        className='w-full p-3 rounded-md border border-gray-300 placeholder:italic placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none'
      ></textarea>

      {/* Submit Button */}
      <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-10 rounded-md font-bold md:text-lg transition duration-300 shadow-md'>
        Submit
      </button>
    </form>

  </div>
</div>

     
  )
}

export default Contact

