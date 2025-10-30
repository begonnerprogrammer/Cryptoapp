import { memo, useContext } from 'react';
import { userContext } from '../App';

const Userdashboard = () => {
     const {user}=useContext(userContext);
  return (
 <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200 p-6">
  <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl w-full transform hover:scale-105 transition-transform duration-500">
    
    {/* Greeting */}
    <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-6 text-center">
      Hello! {user?.username}
    </h1>

    {/* Button */}
    <div className="flex justify-center mb-8">
    <a href="/posts"> <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-8 py-3 md:px-12 md:py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
        Checkout Our Blogs
      </button>
      </a> 
    </div>

    {/* Description */}
    <h4 className="text-gray-700 text-base md:text-lg leading-relaxed text-center max-w-3xl mx-auto">
      Cryptocurrency markets have been experiencing a surge recently, with major coins like Bitcoin and Ethereum seeing significant price increases. This "crypto hype" is fueled by factors such as renewed institutional interest, adoption of blockchain technology in mainstream finance, and positive market sentiment from social media and influential figures. Investors are optimistic about potential high returns, though volatility remains extremely high, making the market both exciting and risky.
    </h4>

  </div>
</div>


  );
};

export default Userdashboard;