import React, { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react'
import { userContext } from '../App'
const Create = () => {
    const [title,setTitle]=useState();
    const [desc,setDescription]=useState();
    const [file,setFile]=useState();
    //user edit or delete functionality
    const user=useContext(userContext);
    const submit=async()=>{
      const formData=new FormData();
      formData.append('title',title)
      formData.append('description',desc)
      formData.append("file",file)
      //user only edit and delete functionaliity for which inserting email field in database and match it with posted email
      formData.append('email',user.email)


      axios.post("/create",formData,{title,desc,file})
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
      <div className='post_container'>
        <div className='post_form'>
            {/* <h1>{JSON.stringify(title+desc+file,undefined,2)}</h1> */}
            <form onSubmit={handleSubmit}>
                <h2>Create Post</h2>
                <input type="text" placeholder='Enter Title' onChange={e=>setTitle(e.target.value)}/>
                <textarea name="desc" id="desc" cols="30" rows="10" placeholder='Enter Description' onChange={e=>setDescription(e.target.value)} ></textarea>
                <input type="file" name='' id='' className='file' placeholder='Select File' onChange={e=>setFile(e.target.files[0])} />
                <button>Post</button>
            </form>
        </div>
      </div>
    </>
  )
}

export default Create
