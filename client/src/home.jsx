import React from 'react'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from './App'

const Home = () => {
  //asswssing context api
  const user=useContext(userContext);
  const location=useLocation();
  console.log(user)

  

  const navigate = useNavigate();


//logout funciotnality
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


  //authentication at page reload use effect
  useEffect(() => {
    fetch("/home")
      .then(res => res.json())
      .then(data => {
        if (data === "success") {
          alert("YOU ARE AUTHORIZED")
          navigate("/home")
         
        }
        if (data === "the token is not there") {
          navigate("/")
          // alert("Sign In First")
   
        }
      })
      .catch(err => console.log(err))
  }, [""])






  return (
    <>
      <h1>home</h1>
      {
        user.email ? <button onClick={logout}> logout</button> : <button>login</button>
      }
    
    </>
  )
}

export default Home
