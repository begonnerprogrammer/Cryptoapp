import { memo } from 'react';
import { NavLink } from 'react-router-dom';
const Footer = () => {
  return <>
  <div className="z-10 mt-3 bg-gradient-to-r from-gray-800 to-gray-600 p-4 text-center text-white rounded-t-lg shadow-md md:text-2xl sm:text-[12px]">
  <h1>
    &#xA9; 
    <span className="ml-1 cursor-pointer font-semibold hover:text-yellow-300 transition duration-300">
      All Rights Reserved
    </span>
  </h1>
</div>

  </>
    
  
};

export default Footer;