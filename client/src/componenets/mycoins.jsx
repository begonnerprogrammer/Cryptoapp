import { memo } from 'react';
import { BiBitcoin } from 'react-icons/bi';
import { useParams } from "react-router-dom";
import { useContext } from 'react';
import { userContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
const Mycoins = () => {
  const { symbol } = useParams(); //Api will fetch data accprding to this symbol
   
const [search,setSearch]=useState('null')
   const {user,Money,setMoney,mycoins,setMycoins,purchaseprice,setPurchaseprice}=useContext(userContext);
  const navigate=useNavigate();



 const [coins,setCoins]=useState();

useEffect(()=>{
  fetch(`/data/coins.json?name=${symbol}&allCoins=allcoins`)
  .then(res => res.json())
  .then(data =>setCoins(data))
  .catch(err=>console.log(err))
  

},[])






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
 {
  coins?.map((coin) => (
    <div
      key={coin.symbol}
      className="flex flex-col items-center justify-center mt-6 bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-xl mx-auto"
    >
      {/* Coin Icon & Name */}
      <div className="flex flex-col items-center justify-center p-4">
        <img
          src={coin.icon}
          alt={coin.symbol}
          className="w-16 h-16 bg-orange-500 rounded-full p-1 animate-bounce mb-2"
        />
        <h1 className="font-bold text-xl text-gray-800">
          {coin.name} ({coin.symbol})
        </h1>
      </div>

      {/* Coin Main Image */}
      <div className="w-full flex items-center justify-center bg-gray-50 p-4">
        <img
          src={coin.image}
          alt={coin.name}
          className="w-full max-w-md rounded-lg shadow-md"
        />
      </div>

      {/* Coin Details */}
      <div className="flex flex-col w-full p-4 space-y-2">
        <div className="flex justify-between p-2 bg-gray-100 rounded-md">
          <h5 className="text-gray-600 font-medium">Crypto Market Rank</h5>
          <h5 className="font-semibold text-gray-800">{coin.rank}</h5>
        </div>

        <div className="flex justify-between p-2 bg-gray-100 rounded-md">
          <h5 className="text-gray-600 font-medium">Crypto Price</h5>
          <h5 className="font-semibold text-gray-800">${coin.price}</h5>
        </div>

        <div className="flex justify-between p-2 bg-gray-100 rounded-md">
          <h5 className="text-gray-600 font-medium">Market Cap</h5>
          <h5 className="font-semibold text-gray-800">{coin.marketCap}</h5>
        </div>

        <div className="flex justify-between p-2 bg-gray-100 rounded-md">
          <h5 className="text-gray-600 font-medium">24 Hour High</h5>
          <h5 className="font-semibold text-green-500">${coin.high24h}</h5>
        </div>

        <div className="flex justify-between p-2 bg-gray-100 rounded-md">
          <h5 className="text-gray-600 font-medium">24 Hour Low</h5>
          <h5 className="font-semibold text-red-500">${coin.low24h}</h5>
        </div>

        {/* Buy Button */}
        <div className="flex justify-center mt-4">
          <button
            className="px-6 py-2 bg-sky-500 text-white font-medium rounded-lg hover:bg-sky-600 transition-colors duration-300"
            onClick={(e) => {
              handleBuy(coin.symbol, coin.price);
            }}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  ))
}

   
  </>
};

export default Mycoins;