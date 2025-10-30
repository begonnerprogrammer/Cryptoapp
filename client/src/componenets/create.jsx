import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useContext } from 'react'
import { userContext } from '../App'
const Create = () => {
    const [title,setTitle]=useState();
    const [desc,setDescription]=useState();
    const [file,setFile]=useState();
    
    //user edit or delete functionality
    const user=useContext(userContext);
    useEffect(()=>{console.log(user.user.email)},[])
    const [email,setEmail]=useState();
    const submit=async()=>{
      
      
      const formData=new FormData();
      formData.append('title',title)
      formData.append('description',desc)
      formData.append("file",file)
      //user only edit and delete functionaliity for which inserting email field in database and match it with posted email
      formData.append('email',email)


      axios.post("/create",formData,{title,desc,file,email})
      .then(res=>{
        if(res.data==="Success"){
          window.location.href='/'
        }
      })
      .catch(e=>console.log(e))
        // const res=await fetch('/create',{
      
        //   //rrules to write
        //   method:"POST",
        //   headers:{
        //     "Content-Type":"application/json"
        //   },
        //   body:JSON.stringify({
        //     title,desc,file
        //   })
        // })
       
        // const data=await res.json();
       
        // if(data.status===422 || !data){
        //   console.log("Invalid")
        // }
        // else {
        //   console.log("Valid")
        //   navigate("/login")
        //   alert("Submited succesfully")
        // }
      }

  const  handleSubmit=(e)=>{
       e.preventDefault();
    submit();
    }
  return (
    <>
   <div className="flex justify-center items-start py-10 px-4">
  <div className="w-full max-w-lg bg-white border border-gray-300 rounded-xl shadow-md p-8">
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Create Post</h2>

      <input
        type="text"
        placeholder="Enter Title"
        onChange={e => setTitle(e.target.value)}
        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <textarea
        name="desc"
        id="desc"
        cols="30"
        rows="5"
        placeholder="Enter Description"
        onChange={e => setDescription(e.target.value)}
        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
      ></textarea>

      <input
        type="email"
        placeholder="Enter Email"
        onChange={e => setEmail(e.target.value)}
        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <input
        type="file"
        className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        onChange={e => setFile(e.target.files[0])}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Post
      </button>
    </form>
  </div>
</div>

    </>
  )
}

export default Create
