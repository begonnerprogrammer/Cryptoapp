import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
const Editpost = () => {
    const [title,setTitle]=useState();
    const [desc,setDescription]=useState();
   const navigate=useNavigate();
  
    const {id}=useParams();
 //updatiion code
    const submit=async(e)=>{
        e.preventDefault();
    //   const formData=new FormData();
    //   formData.append('title',title)
    //   formData.append('description',desc)
     

//Updating Post
      axios.put('/editpost/'+id,{title,desc})
      .then(res=>{
        if(res.data==="Success"){
          navigate('/')
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


      useEffect(()=>{
        //Setting old data to post for changing them later
        axios.get('/getpost/'+id)
        .then(result=>{
            setTitle(result.data.title)
            setDescription(result.data.description)
        })
        .catch(err=>console.log(err))
        },[])




  const  handleSubmit=(e)=>{
       e.preventDefault();
    submit(e);
    }
  return (
    <>
      <div className='post_container'>
        <div className='post_form'>
            {/* <h1>{JSON.stringify(title+desc+file,undefined,2)}</h1> */}
            <form onSubmit={handleSubmit}>
                <h2>Create Post</h2>
                {/* setting the values to states which we're fetching from api from the current post and then update them  */}
            <input type="text" placeholder='Enter Title' onChange={e => setTitle(e.target.value)} value={title} />
                <textarea value={desc} name="desc" id="desc" cols="30" rows="10" placeholder='Enter Description' onChange={e=>setDescription(e.target.value)} ></textarea>
                <button>Update</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default Editpost

