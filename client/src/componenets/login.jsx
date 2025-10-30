import React, { useContext } from 'react'

import { useState } from 'react';
import "../styles/login.css"
import { useLocation, useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Signup from './signup';
import { userContext } from '../App';
const Login = () => {

    const {user,Money,setMoney}=useContext(userContext);





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

console.log('data is ',data);

 if(data.status==="error" || !data || data.massage==="Invalid credentials"|| data.massage==="No record existed"){
    alert("Invalid ceridentials")
    console.log("Invalid")
    return;
  }
  else{
    console.log("Valid")
    navigate("/")
    // navigate("/home")
  
    alert("login succesfully")
    // alert(`You received a ${data.money} gift!`)
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
  <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-center">
  <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
    <h1 className="text-4xl font-bold text-blue-600 mb-6">Login</h1>

    <form method="POST" className="space-y-5">
      <div className="form space-y-4">
        <div className="text-left">
          <label className="block text-blue-500 font-semibold mb-1">Email</label>
          <input
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            placeholder="Enter email"
            required
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>

        <div className="text-left">
          <label className="block text-blue-500 font-semibold mb-1">
            Password
          </label>
          <input
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            placeholder="Enter password"
            required
          />
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
        </div>
      </div>

      <div className="buttons mt-6 flex flex-col items-center space-y-3">
        <button
          onClick={postlogin}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>

        <span className="text-gray-500 font-medium">OR</span>

        <Link to={"/signup"} className="w-full">
          <button className="w-full bg-gray-100 border border-gray-400 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-200 transition duration-300">
            Signup
          </button>
        </Link>
      </div>
    </form>
  </div>
</div>

    
    </>
  )
}

export default Login
