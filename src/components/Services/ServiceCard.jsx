import React, { useState, useEffect , useContext } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Spinner } from "@telegram-apps/telegram-ui";

import image from "../../assets/biryani_cover.jpg"
import CartContext from '../store/CartContext';
const ServiceCard = ({ service, onClick }) => {
  const [quantity, setQuantity] = useState(1);
  const cartCtx = useContext(CartContext)
  // Set a timer to hide the loading state after 4 seconds
  useEffect(() => {
    
      const existingItem = cartCtx.items.find(item => item.id === service.id);
      setQuantity(existingItem ? existingItem.amount : 0); // Set to existing amount or default to 1
    
  }, [cartCtx.items]);


  return (
    <div  
      className="relative bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer w-full h-[260px] max-w-xs mx-auto"
      onClick={onClick}
      aria-label={`Open details for ${service.title}`}
    
         >      {/* Image container */}
      <div className="relative w-full h-40">
        {/* Price and heart icon container */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-center px-1">
          <p className="text-xs sm:text-sm font-bold text-white bg-black bg-opacity-50 px-1 py-0.5 rounded-lg">
            {service.price} ₽
          </p>
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors duration-300">
            <FaHeart className="text-gray-400 hover:text-red-500 transition-colors duration-300" aria-label="Add to favorites" />
          </div>
        </div>

        {/* Show spinner or image based on loading state */}
         
          <div
            style={{
              backgroundImage: `url(https://iili.io/dQHcloX.webp)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              
            }}
            className="w-full h-full object-cover rounded-lg relative"
            aria-label={`${service.title} image`}
          > 
           {quantity > 0 ? <span className="absolute bottom-0 w-[40px] h-[40px] bg-[red] rounded-[50%] flex justify-center items-center " >{quantity} </span> :"" }
          </div>
        
      </div> 

      {/* Service info */}
      <div className="p-2 text-center">
        <h1 className="text-base sm:text-lg font-bold">{service.title}</h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
          {service.description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
