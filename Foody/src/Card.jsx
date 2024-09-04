import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";

const Card = ({ product, addToCart }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);



  return (
    <div id='card' className='w-full max-w-[200px] md:max-w-[350px] bg-white shadow-md hover:scale-105 transition-all relative z-0'>
      <img src={product.img} className='w-full h-40 md:h-56 object-cover' alt={product.title} />
      <div className="p-4">
        <div className="flex flex-col gap-2 justify-between items-center">
          <h1 className='text-sm md:text-lg font-bold'>{product.Fname}</h1>
          <div className="flex">
            {[...Array(5)].map((star, index) => (
              <FaStar
                key={index}
                size={16}
                color={index <= (hover || rating) ? 'gold' : ''}
                className="md:text-20"
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              />
            ))}
          </div>
        </div>
        <p className="text-xs md:text-sm">{product.Fdesc}</p>
        <p className='text-myorange font-bold text-sm md:text-lg'><span>₦</span>{product.Fprice}</p>
        <button onClick={() => addToCart(product)} className='bg-myorange p-2 w-full text-white rounded-md text-sm md:text-base mt-auto'>Add to cart</button>
      </div>
    </div>
  );
};

export default Card;