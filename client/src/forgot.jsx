import React from 'react'
import { useState } from 'react';
import './App.css';
import { useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Signup from './componenets/signup';
const Login = () => {
const  navigate=useNavigate();

const [user,setUser]=useState({
   email:""
});
// const navigate=useNavigate();
// const name=e.target.name;
// const value=e.target.value;
let name,value;
const handleinput=(e)=>{
   name=e.target.name;
 value=e.target.value;
setUser({...user,[name]:value});
}




const postlogin=async(e)=>{
  e.preventDefault();
  const {email}=user;
  //Sending data to database
 const res=await fetch('/forgot',{

   //rrules to write
   method:"POST",
   headers:{
     "Content-Type":"application/json"
   },
   body:JSON.stringify({
     email,
   })
 })

 const data= await res



 if(data.status===422 || !data || data==="nouser"){
    alert("invalid ceridentials")
    console.log("Invalid")
  }
  else{
    console.log("Valid")
    navigate("/login")
    alert("paswword reset succesfully")
  }

//  (data.status===422 || !data)
}




  return (
    <>
    <h1>Forgot password</h1>
       <form  method='POST'>
          <div className='form'>
           <label>Email</label>
           <input name='email' type="email" value={user.email}  onChange={handleinput} autoComplete='off' placeholder='Enter email'   />
           </div>
           <div className='buttons'>
            {/* <button type='submit'>Send</button> */}
            <button onClick={postlogin} >Send</button><br />
            <Link to={"/home"}><button>Home</button></Link>
           </div>
</form>
    </>
  )
}

export default Login

