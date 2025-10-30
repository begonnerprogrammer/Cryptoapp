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
  const res=await fetch('/register',{

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
 
  if(data==="already have an acount" || !data){
    console.log("user exist");
    alert('user exist');
    return;
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
<div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-center">
  <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
    <h1 className="text-4xl font-bold text-blue-600 mb-6">Signup</h1>

    <form method="POST" className="space-y-5">
      <div className="form space-y-4">
        <div className="text-left">
          <label className="block text-blue-500 font-semibold mb-1">
            Name
          </label>
          <input
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
          />
          {errors.name && (
            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
          )}
        </div>

        <div className="text-left">
          <label className="block text-blue-500 font-semibold mb-1">
            Email
          </label>
          <input
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>

        <div className="text-left">
          <label className="block text-blue-500 font-semibold mb-1">
            Password
          </label>
          <input
            className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
        </div>
      </div>

      <div className="buttons mt-6 flex flex-col items-center space-y-3">
        <button
          onClick={postdata}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Signup
        </button>

        <span className="text-gray-500 font-medium">OR</span>

        <Link to={"/login"} className="w-full">
          <button className="w-full bg-gray-100 border border-gray-400 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-200 transition duration-300">
            Login
          </button>
        </Link>
      </div>
    </form>
  </div>
</div>

 
        
        

           </>
           
}

export default Signup;
