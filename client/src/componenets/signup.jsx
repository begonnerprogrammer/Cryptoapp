import { useState ,useEffect} from 'react';
import '../App.css';
import { useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useContext } from 'react'
import { userContext } from '../App'
function Signup() {
  // using conntextapi
  const username=useContext(userContext);
   //storing data in states
// const [user,setUser]=useState({
//   name:"",email:"",password:""
// });

const [name,setName]=useState();
const [email,setEmail]=useState();
const [password,setPassword]=useState();
const [errors,setErrors]=useState([]);
const navigate=useNavigate();


















// //storing data in states
// let name,value;
// const handleinput=(e)=>{
//    name=e.target.name;
//  value=e.target.value;
// setUser({...user,[name]:value});
// }



//registring 
const postdata=async(e)=>{
  e.preventDefault();
const errors=validate();
setErrors(errors);
if(Object.keys(errors).length === 0){

 console.log("ok");
 submit();

}
else{
  console.log("error")
  console.log(errors)
}
 
}




const submit=async()=>{
  const res=await fetch('blogapp-mernstack-api.vercel.app/register',{

    //rrules to write
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      name,email,password,
    })
  })
 
  const data=await res.json();
 
  if(data.status===422 || !data){
    console.log("Invalid")
  }
  else {
    console.log("Valid")
    navigate("/login")
    alert("Submited succesfully")
  }
}


const validate=()=>{
  const error={};
  if(!name){
    error.name="Name is Required"
  }
  
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















  return <>  
<div className='realtive flex items-center justify-center text-center'>
  <div>
  <h1 className='text-3xl mt-8 text-blue-500'>Signup</h1>
   {/* {JSON.stringify( "   name:   "+name   +"    email :" + email + "    password  :" +  password,undefined,2)} */}
        <form  method='POST' className=' max-w-[260px] bg-gray-200 p-4'>
          <div className='form'>
           <label className='text-blue-500'>Name</label>
           <input className='w-[100%] p-2 text-[15px] mt-2 bg-gray-400 placeholder-white' name='name' type="text"  onChange={(e)=>setName(e.target.value)}  placeholder='Enter name'  />
           {errors.name && <div className='error'>{errors.name} </div> } 
           <label className='text-blue-500'>Email</label>
           <input className='w-[100%] p-2 text-[15px] mt-2 bg-gray-400 placeholder-white' name='email' type="email" onChange={(e)=>setEmail(e.target.value)}  placeholder='Enter email'   />
           {errors.email && <div className='error'>{errors.email}</div>}
           <label className='text-blue-500'>Password</label>
           <input className='w-[100%] p-2 text-[15px] mt-2 bg-gray-400 placeholder-white' name='password' type="password"  onChange={(e)=>setPassword(e.target.value)}  placeholder='Enter password'  />
           {errors.password && <div className='error'>{errors.password}</div>}
           </div>
           <div className='buttons mt-6'>
           <button onClick={postdata} className='border-2 border-black border-solid rounded-md  sm:text-xl md:text-xl p-2 hover:bg-black hover:text-white transition duration-500 mt-2'>Signup</button> <span className=' text-blue-600 sm:text-xl md:text-2xl'>OR </span>
           <Link to={"/login"}><button className='border-2 border-black border-solid rounded-md sm:text-xl md:text-xl p-2 hover:bg-black hover:text-white transition duration-500 mt-2'>Login</button></Link>

            {/* <Link to={"/home"}><button>Home</button></Link>
            <Link to={"/test"} ><button>Test</button></Link> */}
            {/* contextapi use benfits */}
            {/* { 
              username.email || username.username ? ` logout ${username.username}` : "login"
             } */}
            
            
           </div>
           </form> 
  </div>

</div>
 
        
        

           </>
           
}

export default Signup;
