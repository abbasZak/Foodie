import React, { useState, useEffect } from 'react';
import Card from './Card';
import { db } from './config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const Menu = (props) => {
  const [productList, setProductList] = useState([]); // Initialize as an array

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productRef = collection(db, "Products"); // Firestore collection reference
        const data = await getDocs(productRef); // Fetch all documents
        const filteredData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })); 
        setProductList(filteredData); // Set state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };
    getProducts();
  }, []);

  return (
    <section className='flex flex-col justify-center items-center p-6 z-0'>
      <h1 className='text-4xl font-bold'>Menu</h1>
      <br />
      <div className="text-center grid grid-cols-2 md:grid-cols-3 gap-4 pb-1" id="cards">
        {productList.map((item) => (
          <Card
            key={item.id}
            product={item}
            addToCart={props.addToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default Menu;
