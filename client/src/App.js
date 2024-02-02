import { useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Login from './componenets/login';
import Signup from './componenets/signup';
import Forgot from "./forgot"
import Test from './test';
import Home from './home';
import Posts from './componenets/posts';
import Post from './componenets/post';
import Page from "./componenets/page"
import User from './user';
import Main from "./componenets/main"
import { createContext } from "react";
import axios from "axios";
import Create from './componenets/create';
import Editpost from './componenets/editpost';
import About from './componenets/about';
import Navbar from './componenets/main';
import Contact from './componenets/contact';
export const userContext = createContext();
function App() {

  const navigate = useNavigate();


  const [user, setUser] = useState({});
  //getting username && email and store them in state
  useEffect(() => {
    fetch("/test")
      .then(res => res.json())
      .then(data => {
        setUser(data);
      })
      .catch(err => console.log(err))
  }, [''])





       //using context api to pass data to all routes
  return <userContext.Provider value={user}>
    <>
    <Navbar/>
      <Routes>
        {/* <Route path='/home' element={<Home />}></Route> */}
        <Route path='/' element={<Page/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        {/* <Route path='/user' element={<User/>}></Route> */}
        <Route path='/about' element={<About/>}></Route>
        <Route path='/posts' element={<Posts/>}></Route>
        <Route path='/post/:id' element={<Post/>} />
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        {/* <Route path="/test" element={<Test />} ></Route>
        <Route path="/forgot" element={<Forgot/>}></Route> */}
        <Route path="/create" element={<Create/>} ></Route>
        <Route path='/editpost/:id' element={<Editpost/>} />
       </Routes>
    </>
  </userContext.Provider>

}

export default App;
