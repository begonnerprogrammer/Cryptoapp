import React, { useEffect, useState } from 'react'
import "../styles/page.css"
import { Link, Navigate } from 'react-router-dom'
import { FaEthereum, FaReact } from "react-icons/fa6";
import { FaNodeJs } from "react-icons/fa6";
import { BiLogoMongodb } from "react-icons/bi";
import { BiBitcoin } from 'react-icons/bi';
import { RiBnbFill } from "react-icons/ri";
import { TbBrandTether } from "react-icons/tb";
import { TbCurrencySolana } from "react-icons/tb";
import { TbCurrencyXrp } from "react-icons/tb";
import { TbCurrencyDogecoin } from "react-icons/tb";
import { SiExpress } from "react-icons/si";
import { useContext } from 'react'
import { userContext } from '../App'
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import axios from 'axios';
// {



// }

const Page = () => {
 
  const [coins,setCoins]=useState();
const [search,setSearch]=useState('null');

  const {user,Money,setMoney,mycoins,setMycoins,purchaseprice,setPurchaseprice}=useContext(userContext);











useEffect(() => {
  

  const fetchCoins = async () => {
    if(search===""){
      setSearch('null')
    }
    try {
      const res = await fetch(`/data/coins.json?name=${encodeURIComponent(search)}&allCoins=allcoins`);
      const data = await res.json();
      

      // Only set state after data is fully received
      setCoins(data);
      console.log(data);
      console.log('usse effect')
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  fetchCoins();
}, [search]);

const storecoin = async(coins) => {
  console.log("Coins to send:", coins);
  
  let userEmail=user.email;
  console.log(userEmail)

  const res=await fetch('/postcoin',{

    //rrules to write
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      coins,userEmail
    })
  })
 
  const data=await res.json();
 
  if(data.status===422 || !data){
    console.log("Invalid")
  }
  else {
    console.log("Valid")
   console.log(data);
    alert("coin saved succesfully")
  }
};

  




 
    const navigate=useNavigate();
   
  
 
 

  const coindetails = (symbol) => {
  navigate(`/coindetails/${symbol}`);
 
};



const updatedbmoney=async(money,email)=>{
  
     
       try {
     const res = await fetch('/updatemoney', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ money, email })
});

const data = await res.json();
console.log("data is", data);
 if (data.success) {
    console.log("✅ Server message:", data.message);
    console.log("💰 Updated money value:", data.data);

    

    alert(`Money updated successfully: $${data.data}`);
  } else {
    alert("Update failed: " + data.message);
  }
    
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
return;
}









  const handleBuy = (symbol,price) => {
    

  const confirmed = window.confirm(`Are you sure you want to buy ${symbol}?`);

  if (confirmed) {




    setMycoins((prevCoins) => {
  if (prevCoins.includes(symbol)) { 
    alert(`${symbol} is already in your coins!`);
    return prevCoins;
  }
  else {

            if(user.email || user.username){

              
      
                                 if(Money>=price){
                                      console.log(`Buying ${symbol}`); 
                                    alert(`Your order has Been confirmed and ${price} is cut from your wallet`);
                                    let dbmoney=Money-price;
                                   setMoney(dbmoney);  //PRICE OF BITCOIN FROM API
                                      let newcoins=[...prevCoins, symbol]; 
                                            storecoin(newcoins);
                                            updatedbmoney(dbmoney,user.email);
                                            return newcoins;
                                         
                                          }
                                          if(Money<price){
                                            let finalPrice=Money;
                                            alert("you can only buy a percent of a coin beacause of low balance");
                                           let value=prompt("Enter 25%,50%,75%,100%");
                                           console.log(value)
                                             let halfprice=finalPrice/2;
                                         let  fullprice=finalPrice;
                                            let seventyfive=finalPrice*0.75;
                                            let twentyfive=finalPrice*0.25;
                                          if (value === '100%' || value === '100') finalPrice = fullprice;
                                         if (value === '50%' || value === '50') finalPrice = halfprice;
if (value === '75%' || value === '75') finalPrice = seventyfive;
if (value === '25%' || value === '25') finalPrice = twentyfive;
console.log(finalPrice)
                                         setPurchaseprice(finalPrice);
                                          let dbmoney=Money-finalPrice;
                                          setMoney(dbmoney); 
                                            let newcoins=[...prevCoins, symbol]; 
                                            storecoin(newcoins);
                                            updatedbmoney(dbmoney,user.email);
                                            return newcoins;
                                          }
  
       
    }













    
   else{
     alert("Sign in Before Buying!");
       navigate('/login');
   }













return [...prevCoins]

    
  }
  
});

 

    
  }
  
  
  else {
    console.log("User canceled the buy action");
    alert("order canceled")
  }
   console.log(mycoins)
};




  return <>
 
  
  
    <div className='main mt-5 mb-3 mernstack relative h-100% flex flex-col items-center justify-center sm:text-xl md:text-3xl'>
     <div className='mb-3 mt-3 flex'>
     <FaReact className='text-blue-500 animate-bounce' />
      <FaNodeJs className='text-yellow-500 animate-bounce  delay-200'  />
      <BiLogoMongodb className='text-green-500 animate-bounce delay-300'  />
      <SiExpress  className='text-black animate-bounce delay-400' />
     </div>
      <h1 className='  animation-ping tracking-normal text-base'>Welcome! {
   user.email || user.username ? `${user.username}` : ""
      } TO MY Complete <span className='text-blue-500 sm:text-xl md:text-xl'>MERN-STACK CRYPTO-APP</span></h1>

{
     user.email || user.username ? <h5 className='m-2 text-xl'>Your Current Balance <span className='bg-green-400 border border-2 border-gray-300'>{Money}$</span> </h5> : ""
}

 <div
      className="input-group input-group-sm mb-3 mx-auto"
      style={{ width: "70%", maxWidth: "100%" }}
    >
      <span className="input-group-text" id="inputGroup-sizing-sm">
        Search
      </span>
      <input
        type="text"
        className="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
        onChange={(e) => setSearch(e.target.value)}
    
      />

    
    </div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-3">
  {Array.isArray(coins) && coins.length > 0 ? (
    coins.map((coin, index) => (
      <div key={index} className="rounded-2">
        <li
          className="list-group-item flex justify-around bg-gray-200 w-80 hover:cursor-pointer p-2"
          onClick={() => coindetails(coin.symbol)}
        >
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div>
                <img
                  src={coin.icon}
                  alt={coin.name}
                  className="text-white w-8 mt-2 mr-3 bg-orange-500 rounded-full"
                />
              </div>
              <div>
                <button
                  className="text-xs px-3 py-1 rounded bg-sky-400 text-white hover:bg-gray-900 transition-colors duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBuy(coin.symbol, coin.price);
                  }}
                >
                  Buy
                </button>
              </div>
            </div>

            <div className="flex mt-2">
              <h5 className="text-base">{coin.name}</h5>
              <h5 className="text-base text-gray-500 ml-2">{coin.symbol}</h5>
            </div>

            <div className="flex mt-1">
              <h5 className="text-base">${coin.price}</h5>
              <h5 className="text-base text-gray-500 ml-2">
                {coin.hourchange}
              </h5>
            </div>
          </div>
        </li>
      </div>
    ))
  ) : (
    <h1 className="text-center text-red-600 font-semibold text-xl col-span-3">
      ⚠️ Please type correctly — no coins found.
    </h1>
  )}
</div>


 
     
    </div>
  
    </>
}

export default Page
