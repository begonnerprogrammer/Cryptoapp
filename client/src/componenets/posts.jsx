import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { userContext } from '../App'
const Posts = () => {
  
    // using conntextapi
    const username=useContext(userContext);
    const [posts,setPosts]=useState([]);
    useEffect(()=>{
        axios.get('getposts')
        .then(posts=>setPosts(posts.data))
        .catch(err=>console.log(err))
    },[])
       
  return (
    <>
      <div className='posts_container h-[100%] flex flex-col items-center justify-center'>
   
       {
        posts.map(post=>(
            <Link to={`/post/${post._id}`}>
            <div className='post max-w-[70vw] min-w-[60vw] post mt-5 mb-5 md:flex  items-center border-2 border-black justify-start p-2 '>
              <img  src={`http://localhost:3000/images/${post.file}`} className=' image p-2' alt="" />
              <div className='post_text break-all' >
                 <h2 className='md:text-3xl text-blue-500'>{post.title}</h2>
                 <p>{post.description}</p>
              </div>
              
            </div>
            
            </Link>
              
        ))
       }
       {
        username.email || username.username ?<Link to={"/create"}><button className='button border-2 mb-3 border-black border-solid rounded-md md:text-xl p-2 hover:bg-black hover:text-white transition duration-500 ml-2'>Create POST</button></Link>
         
          :   <Link to={"/login"}><button className='button border-2 mb-3 border-black border-solid rounded-md md:text-xl p-2 hover:bg-black hover:text-white transition duration-500 ml-2'>LOGIN TO CREATE POST</button></Link>
       }
       


      



      </div>
    </>
  )
}

export default Posts
