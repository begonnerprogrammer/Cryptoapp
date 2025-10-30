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
import Wallet from './componenets/wallet';
import Mycoins from './componenets/mycoins'
import Footer from './componenets/footer' 
import Buycoins from './componenets/buycoins';
import Admin from './componenets/admin';
import Userdashboard from './componenets/userdashboard';

export const userContext = createContext();
function App() {

  const navigate = useNavigate();


  const [user, setUser] = useState({});
  const [Money,setMoney]=useState();
  const [mycoins,setMycoins]=useState([]);
  const [purchaseprice,setPurchaseprice]=useState();
  //getting username && email and store them in state
  useEffect(() => {
    fetch("/test")
      .then(res => res.json())
      .then(data => {
        setUser(data);
      })
      .catch(err => console.log(err))
  }, [''])






  const fetchcoins=()=>{
 console.log("first the user",user)
 if (!user || !user.email) {
    console.log("User not ready yet — skipping fetch");
    return; // Wait until user is loaded
  }

  console.log("Email is available:", user.email);

  fetch(`/getmoney?email=${user?.email}`)
    .then(res => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json(); // ✅ parse JSON
    })
    .then(data => console.log(setMoney(data.money))) // now data is the actual response
    .catch(err => console.log(err));

}


useEffect(() => {
 fetchcoins();
 
}, [user]);








       //using context api to pass data to all routes
  return <userContext.Provider  value={{ user,Money,setMoney,mycoins,setMycoins,purchaseprice,setPurchaseprice}}>
    <>
   <div className="flex flex-col min-h-screen"> {/* 🧱 Full-height layout */}
      <Navbar />

      <main className="flex-grow"> {/* 📄 Expands to fill space between nav & footer */}
        <Routes>
          <Route path="/" element={<Page />} />
           <Route path="/Admin" element={<Admin />} />
           <Route path="/userdashboard" element={<Userdashboard />} />
          <Route path="/my-coins" element={<Buycoins />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/coindetails/:symbol" element={<Mycoins />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create" element={<Create />} />
          <Route path="/editpost/:id" element={<Editpost />} />
        </Routes>
      </main>

      <Footer /> {/* 🦶 Always stays at bottom */}
    </div>


















    </>
  
  </userContext.Provider>

}

export default App;
