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
    coins?.map((coin)=>( <div className='flex flex-col items-center justify-center mt-4' key={coin.symbol}>
      <div className='flex flex-col items-center justify-center'>
        <img src={coin.icon} className=' text-white mt-1 mr-3 bg-orange-500 rounded-full w-20 h-full animate-bounce' />
        <h1 className='font-bold'>BitCoin ({coin.symbol})</h1>
      </div>
      <div className='w-full flex items-center justify-center' >
        <img src={coin.image} alt="Bitcoin" className='w-96'/>
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex justify-between p-2'>
          <div><h5>crypto market rank</h5></div>
          <div><h5>{coin.rank}</h5></div>
          
        </div>
        <hr />
        <div className='flex justify-between p-2'>
          <div>
            <h5>crypto price</h5>
          </div>
          <div>
            <h5>${coin.price}</h5>
          </div>

        </div>
        <hr />
          <div className='flex justify-between p-2'>
          <div>
            <h5>Market Cap</h5>
          </div>
          <div>
            <h5>{coin.marketCap}</h5>
          </div>

        </div>
        <hr />
          <div className='flex justify-between p-2'>
          <div>
            <h5>24 Hour High</h5>
          </div>
          <div>
            <h5>${coin.high24h}</h5>
          </div>

        </div>
        <hr />
          <div className='flex justify-between p-2'>
          <div>
            <h5>24 Hour Low</h5>
          </div>
          <div>
            <h5>${coin.low24h}</h5>
          </div>

        </div>
        <div className='text-center'>
          <button className='btn bg-info text-xs w-50'  onClick={(e) => {handleBuy(coin.symbol,coin.price);}} >Buy</button>
        </div>
      </div>
    </div>))
  }
   
  </>
};

export default Mycoins;