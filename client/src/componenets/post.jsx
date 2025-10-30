import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import "../styles/post.css"
import { userContext } from '../App'
const Post = () => {
    const {id}=useParams();
    //to giving edit or delete functionality only by the user we use context api
    const {user}=useContext(userContext);
const navigate=useNavigate();
    const [post,setPost]=useState({});
    const handledelete=(id)=>{
     axios.delete('/deletepost/'+id)
     .then(result=>{
      navigate('/')
     })
     .catch(e=>console.log(e))
    }

console.log(id)
//where getting the post from the database on page load and display them
    useEffect(()=>{
        console.log(user)
        axios.get('/getpost/'+id)
        .then(result=>setPost(result.data))
        .catch(err=>console.log(err))
        },[])
    console.log(id)
   console.log(post)
    
  return (
    <>
<div className="relative flex justify-center items-center py-10 px-4">
  <div className="main relative border border-[#A39E94] rounded-lg overflow-hidden md:w-[70vw] sm:w-[90vw] flex flex-col md:flex-row transition-all duration-300 hover:shadow-xl bg-[#f9f7f5]">

    {/* Post Content (Left side, aligned top-left on all screens) */}
    <div className="p-8 flex flex-col justify-start items-start md:w-[50%] w-full">
      <h1 className="text-4xl font-bold mb-4 text-left w-full">{post.title}</h1>
      <p className="text-gray-900 leading-relaxed text-base mb-8 break-words text-left w-full">{post.description}</p>

      {/* Conditional Buttons */}
      {user.email === "admin333@gmail.com" && (
        <div className="flex items-center space-x-4">
          <Link to={`/editpost/${post._id}`}>
            <button className="border border-blue-600 text-blue-600 rounded-md text-base md:text-lg px-4 py-2 hover:bg-blue-600 hover:text-white transition duration-300">
              Edit
            </button>
          </Link>
          <span className="text-gray-500 font-medium">OR</span>
          <button
            className="border border-red-500 text-red-500 rounded-md text-base md:text-lg px-4 py-2 hover:bg-red-500 hover:text-white transition duration-300"
            onClick={e => handledelete(post._id)}
          >
            Delete
          </button>
        </div>
      )}
    </div>

    {/* Image container aligned right */}
    <div className="md:w-[50%] w-full p-6 flex items-center justify-center">
     <img
  src={`http://localhost:3000/images/${post.file}`}
  alt={post.title}
  className="max-w-[300px] max-h-60 md:max-h-80 object-cover rounded-lg transition-transform duration-500 hover:scale-105"
/>

    </div>

  </div>
</div>







    </>
  )
}

export default Post
