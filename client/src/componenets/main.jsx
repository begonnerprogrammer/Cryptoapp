import React, { useEffect, useState } from 'react'
import "../styles/home.css"
import { NavLink } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../App'
import Footer from './footer'
const Main = () => {

  const [contextvalue,setContextvalue]=useState();
   // using conntextapi
  const {user}=useContext(userContext);
   const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logout=()=>{
    fetch("/logout").then(res=>res.json())
    .then(data=>{
      if(data==="success")
      {
        alert("logout succesffully")
        navigate("/")
        window.location.reload()
    }
  }
  )
  .catch(err => console.log(err))
  }
  
  
   

  return <>
  <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-md border-b border-gray-600">
      <div className="flex items-center justify-between p-4 md:p-6">
        {/* Logo */}
        <h1 className="coino md:text-4xl text-xs font-bold tracking-wide hover:text-yellow-400 cursor-pointer transition duration-500">
          &#xA9;Coino
        </h1>

        {/* Hamburger Button - only on small screens */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6">
          <NavLink to={"/"}>
            <li className="md:p-3 sm:p-2 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300 md:text-xl sm:text-[12px]">
              Home
            </li>
          </NavLink>
          <NavLink to={"/posts"}>
            <li className="md:p-3 sm:p-2 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300 md:text-xl sm:text-[12px]">
              Blog
            </li>
          </NavLink>
          <NavLink to={"/contact"}>
            <li className="md:p-3 sm:p-2 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300 md:text-xl sm:text-[12px]">
              Contact
            </li>
          </NavLink>

          {user.email || user.username ? (
            <>
              <NavLink to={"/wallet"}>
                <li className="md:p-3 sm:p-2 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300 md:text-xl sm:text-[12px]">
                  Wallet
                </li>
              </NavLink>
              <NavLink to={"/my-coins"}>
                <li className="md:p-3 sm:p-2 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300 md:text-xl sm:text-[12px]">
                  My Coins
                </li>
              </NavLink>
            </>
          ) : (
            <NavLink to={"/signup"}>
              <li className="md:p-3 sm:p-2 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300 md:text-xl sm:text-[12px]">
                Signup
              </li>
            </NavLink>
          )}

          {user.email || user.username ? (
            <li
              onClick={logout}
              className="md:p-3 sm:p-2 rounded-md hover:bg-white/10 hover:text-red-400 transition duration-300 md:text-xl sm:text-[12px]"
            >
              Logout
            </li>
          ) : (
            <NavLink to={"/login"}>
              <li className="p-3 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300 md:text-xl sm:text-[14px]">
                Login
              </li>
            </NavLink>
          )}

          {user.email && user.username ? (
            user.email !== "admin333@gmail.com" && user.username !== "Admin" ? (
              <NavLink to={"/userdashboard"}>
                <li className="md:p-3 sm:p-2 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300 md:text-xl sm:text-[12px]">
                  User
                </li>
              </NavLink>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          {user.email === "admin333@gmail.com" && user.username === "Admin" ? (
            <NavLink to={"/Admin"}>
              <li className="md:p-3 sm:p-2 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300 md:text-xl sm:text-[12px]">
                Admin
              </li>
            </NavLink>
          ) : (
            ""
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`${
          open ? "flex flex-col p-4 space-y-2" : "hidden"
        } md:hidden bg-gradient-to-r from-gray-800 to-gray-700`}
      >
        <NavLink to={"/"}>
          <li className="p-3 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300">
            Home
          </li>
        </NavLink>
        <NavLink to={"/posts"}>
          <li className="p-3 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300">
            Blog
          </li>
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="p-3 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300">
            Contact
          </li>
        </NavLink>

        {user.email || user.username ? (
          <>
            <NavLink to={"/wallet"}>
              <li className="p-3 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300">
                Wallet
              </li>
            </NavLink>
            <NavLink to={"/my-coins"}>
              <li className="p-3 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300">
                My Coins
              </li>
            </NavLink>
          </>
        ) : (
          <NavLink to={"/signup"}>
            <li className="p-3 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300">
              Signup
            </li>
          </NavLink>
        )}

        {user.email || user.username ? (
          <li
            onClick={logout}
            className="p-3 rounded-md hover:bg-white/10 hover:text-red-400 transition duration-300"
          >
            Logout
          </li>
        ) : (
          <NavLink to={"/login"}>
            <li className="p-3 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300">
              Login
            </li>
          </NavLink>
        )}

        {user.email && user.username ? (
          user.email !== "admin333@gmail.com" && user.username !== "Admin" ? (
            <NavLink to={"/userdashboard"}>
              <li className="p-3 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300">
                User
              </li>
            </NavLink>
          ) : (
            ""
          )
        ) : (
          ""
        )}

        {user.email === "admin333@gmail.com" && user.username === "Admin" ? (
          <NavLink to={"/Admin"}>
            <li className="p-3 rounded-md hover:bg-white/10 hover:text-yellow-400 transition duration-300">
              Admin
            </li>
          </NavLink>
        ) : (
          ""
        )}
      </ul>
    </div>
  
  </>
}

export default Main




