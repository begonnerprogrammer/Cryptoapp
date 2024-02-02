import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import "../styles/post.css"
import { userContext } from '../App'
const Post = () => {
    const {id}=useParams();
    //to giving edit or delete functionality only by the user we use context api
    const username=useContext(userContext);
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
        axios.get('/getpost/'+id)
        .then(result=>setPost(result.data))
        .catch(err=>console.log(err))
        },[])
    console.log(id)
  return (
    <>
    <div className='relative'>
        <div className='main p-2 absolute top-10 md:left-20 sm:left-20 h-[100%]  flex '>
            {/* we cant use image directly we have to add a line in backend in index.js file */}
            <img src={`http://localhost:3000/images/${post.file}`} className='img md:h-[40vh] md:w-[50vw] rounded-md' alt="" />
            <div className='p-2 break-all text-start'>
            <h1 className='md:text-2xl text-blue-500' >{post.title}</h1>
            <p className='p-text md:text-xl'>{post.description}</p>
            </div>
         
            <div>

      <div className='button absolute md:top-72 left-16 '>
 {/* only display the buttons when user email = created post user email */}
 {
              username.email===post.email ? <div className='flex'> <Link to={`/editpost/${post._id}`}><button className='button border-2 border-black border-solid rounded-md md:text-xl p-2 hover:bg-black hover:text-white transition duration-500 ml-2'>Edit</button></Link> <span className='OR text-blue-500 ml-2 md:mt-3'>OR</span>
              <button className='button border-2 border-black border-solid rounded-md md:text-xl p-2 hover:bg-black hover:text-white transition duration-500 ml-2' onClick={e=>handledelete(post._id)} >Delete</button></div> :""
            }
      </div>
             
            
           
            </div>
        </div>
    </div>
    </>
  )
}

export default Post
