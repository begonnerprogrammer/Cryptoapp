import React from 'react'

import { useState } from 'react';
import "../styles/login.css"
import { useLocation, useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Signup from './signup';
const Login = () => {
const  navigate=useNavigate();
const location=useLocation();
const [email,setEmail]=useState();
const [password,setPassword]=useState();
// const [user,setUser]=useState({
//    email:"",password:""
// });
const [errors,setErrors]=useState([]);
// const navigate=useNavigate();
// const name=e.target.name;
// const value=e.target.value;
// let name,value;
// const handleinput=(e)=>{
//    name=e.target.name;
//  value=e.target.value;
// setUser({...user,[name]:value});
// }


const submit=async()=>{

  //Sending data to database
 const res=await fetch('/login',{

   //rrules to write
   method:"POST",
   headers:{
     "Content-Type":"application/json"
   },
   body:JSON.stringify({
     email,password,
   })
 })

 const data=await res.json();



 if(data.status===422 || !data || data==="notsuccess"){
    alert("invalid ceridentials")
    console.log("Invalid")
  }
  else{
    console.log("Valid")
    navigate("/")
    // navigate("/home")
  
    alert("login succesfully")
    window.location.reload()
    
  }

//  (data.status===422 || !data)
}

const postlogin=async(e)=>{
  e.preventDefault();
  const errors=validate();
setErrors(errors);
if(Object.keys(errors).length === 0){
 submit();
}
else{
  console.log("error")
  console.log(errors)
}
}

const validate=()=>{
  const error={};
  
  if(!email){
    error.email="Email is Required"
  }
  // else if(!/\$+@\$+\.\$+/.test(email)){
  //     error.email="Email is not in Correct Form";
  // }
 

  if(!password){
    error.password="Password is Required";
  }


  return error
}


  return (
    <>
    <div className='realtive flex items-center justify-center text-center'>
      <div>
      <h1 className='text-3xl mt-8 text-blue-500'>Login</h1>
    {/* {JSON.stringify(  "email :" + email + "    password  :" +  password,undefined,2)} */}
       <form  method='POST' className=' max-w-[260px] bg-gray-200 p-4'>
          <div className='form'>
            
            <label className='text-blue-500'> Email </label>
           <input className='w-[100%] p-2 text-[15px] mt-2 bg-gray-400 placeholder-white'  name='email' type="email"   onChange={(e)=>setEmail(e.target.value)} autoComplete='off' placeholder='Enter email' required   />
           {errors.email && <div className='error'>{errors.email} </div> } 
           
          
        
          <label className='text-blue-500'>Password</label>
           <input className='w-[100%] p-2 text-[15px] mt-2 bg-gray-400 placeholder-white'  name='password' type="password"  onChange={(e)=>setPassword(e.target.value)} autoComplete='off' placeholder='Enter password' required  />
           {errors.password && <div className='error'>{errors.password} </div> } 
       
           
           </div>
           <div className='buttons mt-6'>
            <button onClick={postlogin} className='border-2 border-black border-solid rounded-md  sm:text-xl md:text-xl p-2 hover:bg-black hover:text-white transition duration-500 mt-2'>Login</button> <span className=' sm:text-xl md:text-2xl text-blue-600'>OR</span>
            <Link to={"/signup"}>  <button className='border-2 border-black border-solid rounded-md  sm:text-xl md:text-xl p-2 hover:bg-black hover:text-white transition duration-500 mt-2'>Signup</button></Link><br />
           {/* <Link to={"/forgot"}>Forgot Password</Link><br /> */}
            {/* <Link to={"/home"}> <button className='border-2 border-black border-solid rounded-md text-xl p-2 hover:bg-black hover:text-white transition duration-500 mt-2'>Home.</button></Link> */}
           </div>
</form>
      </div>
   
    </div>
    
    </>
  )
}

export default Login
