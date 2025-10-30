import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { userContext } from '../App'
const Posts = () => {
  
    // using conntextapi
    const {user}=useContext(userContext);
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
      console.log(user)
        axios.get('getposts')
        .then(posts=>setPosts(posts.data))
        .catch(err=>console.log(err))
    },[])
       
  return (
    <>
<div className='posts_container min-h-screen flex flex-col items-center justify-start py-10 '>

  {/* Posts list */}
  {
    posts.map(post => (
      <Link to={`/post/${post._id}`} key={post._id} className='w-full flex justify-center'>
        <div className='post bg-[#f9f7f5] border border-[#d9d4cf] rounded-lg max-w-[85vw] md:max-w-[70vw] w-full mt-8 shadow-sm hover:shadow-md transition-all duration-300'>

          <div className='md:flex'>

            {/* Text Section aligned top-left */}
            <div className='post_text p-6 md:w-[60%] flex flex-col justify-start'>
              <h2 className='text-3xl md:text-4xl font-semibold text-[#222222] mb-3'>{post.title}</h2>
              <p className='text-[#444444] text-base md:text-lg leading-relaxed mb-4'>
                {post.description}
              </p>
             
            </div>

            {/* Image Section with padding */}
            <div className='w-full md:w-[40%] p-4'>
              <img
                src={`http://localhost:3000/images/${post.file}`}
                alt=''
                className='w-60 h-60 md:h-full object-cover rounded-lg transition-transform duration-500 hover:scale-105'
              />
            </div>
          </div>
        </div>
      </Link>
    ))
  }

  {/* Create Post / Login Button */}
  <div className='mt-12'>
    {
      user.email || user.username ? (
        user.email==='admin333@gmail.com'&&user.username==='Admin'? (<Link to={"/create"}>
          <button className='button bg-[#222222] text-white rounded-md text-lg md:text-xl px-8 py-3 hover:bg-black transition duration-300'>
            Create Post
          </button>
        </Link>) : ""
       
      ) : (
      <Link to={"/login"}>
          <button className='button bg-[#444444] text-white rounded-md text-lg md:text-xl px-8 py-3 hover:bg-black transition duration-300'>
            Login to Create Post
          </button>
        </Link> 
       
      )
    }
  </div>

</div>





    </>
  )
}

export default Posts
