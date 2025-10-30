import React, { useEffect, useState } from 'react'
import "../styles/about.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../App'
const Wallet = () => {
 // using conntextapi
     const {user}=useContext(userContext);
const [Money,setMoney]=useState(0);
  const fetchcoins=()=>{
 console.log("first the user",user)
 if (!user || !user.email) {
    console.log("User not ready yet — skipping fetch");
    return; // Wait until user is loaded
  }

  console.log("Email is available:", user.email);

  fetch(`/getmoney?email=${user?.email}`)
    .then(res => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json(); // ✅ parse JSON
    })
    .then(data => console.log(setMoney(data.money))) // now data is the actual response
    .catch(err => console.log(err));

}


useEffect(() => {
 fetchcoins();
 
}, [user]);



  console.log("money from db is=",Money);


      
  return (
  <div className="relative mt-6 p-4 md:p-8 bg-gray-50 min-h-[200px] rounded-xl shadow-lg max-w-4xl mx-auto">
  
  {/* Top Section: Greeting + Button */}
  <div className="flex flex-col md:flex-row items-center justify-between md:justify-evenly gap-6 md:gap-0">
    
    {/* User Greeting */}
    {user?.email || user?.username ? (
      <div className="text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Hello! {user.username}
        </h1>
        <h3 className="text-blue-500 text-lg md:text-xl mt-2 font-medium">
          Your Wallet
        </h3>
      </div>
    ) : null}

    {/* Buy Coin Button */}
    <Link to={"/"}>
      <button className="px-6 py-2 md:px-8 md:py-3 border-2 border-black rounded-md font-semibold hover:bg-black hover:text-white transition-all duration-300">
        Buy Coin
      </button>
    </Link>
  </div>

  {/* Info Section */}
  <div className="mt-8 bg-white p-6 md:p-8 rounded-xl shadow-inner relative">
    <h1 className="text-blue-500 text-lg md:text-xl font-semibold mb-4">Balance</h1>
    
    {/* Amount */}
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
      <h1 className="text-gray-700 font-medium md:mr-4">Amount</h1>
      <h1 className="text-gray-900 font-bold text-lg md:text-xl">{Money}$</h1>
    </div>

    {/* Email */}
    {user?.email || user?.username ? (
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        <h1 className="text-gray-700 font-medium md:mr-4">Email</h1>
        <h1 className="text-gray-900 font-semibold">{user.email}</h1>
      </div>
    ) : null}
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

export default Wallet;
