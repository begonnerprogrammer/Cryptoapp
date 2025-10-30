import { memo, useContext, useEffect, useState } from 'react';
import { BiBitcoin } from 'react-icons/bi';
import { userContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Buycoins = () => {
   const navigate=useNavigate();
    const {user,Money,setMoney,mycoins,setMycoins,purchaseprice,setPurchaseprice}=useContext(userContext);
   const [coins, setCoins] = useState([]); 
    const [search,setSearch]=useState();
    const [buyedcoins,setBuyedcoins]=useState();
  

const fetchcoins=()=>{
 console.log("first the user",user)
 if (!user || !user.email) {
    console.log("User not ready yet — skipping fetch");
    return; // Wait until user is loaded
  }

  console.log("Email is available:", user.email);

  fetch(`/getbuycoins?email=${user?.email}`)
    .then(res => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json(); // ✅ parse JSON
    })
    .then(data => setBuyedcoins(data.coins)) // now data is the actual response
    .catch(err => console.log(err));

}




useEffect(() => {
 fetchcoins();
 
}, [user]);
console.log('buyed coins are',buyedcoins)




useEffect(() => {
  const fetchCoins = async () => {
    try {
      for (const value of buyedcoins) {
        console.log("value inside function",value);
        console.log("Fetching:", value);

        const res = await fetch(`/data/coins.json?name=${encodeURIComponent(value)}&allCoins=allcoins`);
        if (!res.ok) throw new Error(`Failed to fetch ${value}`);

        const data = await res.json();
console.log("fetch data is ",data);
   


        //Append new data safely
       setCoins(prev => {
  const existingSymbols = new Set(prev.map(c => c.symbol));
  const newCoins = data.filter(c => !existingSymbols.has(c.symbol));
  return [...prev, ...newCoins]; 
 });
      }
    } catch (err) {
      console.error("Error fetching coins:", err);
    }
  };

  if (Array.isArray(buyedcoins) && buyedcoins.length > 0) {
    fetchCoins();
  }
}, [buyedcoins]);

console.log("buyed coins outside useeffect",buyedcoins)
console.log("coins outside useeffect",coins)



  const clearstate=()=>{

fetch(`/deletecoin?email=${encodeURIComponent(user.email)}`, {
  method: 'DELETE', // ✅ use DELETE for deletion
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then(res => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json(); // parse JSON response
  })
  .then(data => console.log("Server response:", data)) // log the actual response
  .catch(err => console.error("Error deleting coin:", err));
   window.location.reload();
  

   }
















  return (
   <div className="flex flex-col items-center">
      <div className="w-full flex justify-around mt-5 font-bold text-md sm:text-md">

        <h5>You Purchase History!</h5>
        <button onClick={clearstate} className='w-30 button border-2 mb-3 border-black border-solid rounded-md md:text-sm p-2 hover:bg-black hover:text-white transition duration-500 ml-2'  >Clear History!</button>

      </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-3">
  {coins && coins.length > 0 ? (
    coins.map((coin, index) => (
      <div className="rounded-2" key={index}>
        <li className="list-group-item flex justify-around bg-gray-200 w-80 hover:cursor-pointer">
          <div className="flex flex-col">
            <div className="flex justify-center mt-2">
              <img src={coin.icon} className="w-10 text-3xl text-white mt-1 mr-3 bg-orange-500 rounded-full" />
            </div>

            <div className="flex mt-2">
              <h5 className="text-base">{coin.symbol}</h5>
              <h5 className="text-base text-gray-500 ml-2">{coin.symbol}</h5>
            </div>

            <div className="flex mt-1">
              <h5 className="text-base">${coin.price}</h5>
              <h5 className="text-base text-gray-500 ml-2">{coin.hourchange}</h5>
            </div>
            <h1 className="mt-1 mb-1"> Buy with ${coin.price < Money ? coin.price: purchaseprice }</h1>
          </div>
        </li>
      </div>
    ))
  ) : (
    <p className="text-gray-500">You haven't purchased any coins yet.</p>
  )}

</div>

    </div>
  );

  
};

export default Buycoins;