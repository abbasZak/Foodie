import React, { useState, useEffect } from 'react';
import { db } from './config/firebase';
import { getDocs, collection, query, where, updateDoc, doc } from 'firebase/firestore';
import Package from './images/package.png';

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function getOrders() {
            let orderRef = collection(db, "order");
            let q = query(orderRef, where("status", "==", "pending"));
            try {
                let ordersSnapshot = await getDocs(q);
                let orderData = ordersSnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
                setOrders(orderData);
            } catch (err) {
                console.error("Error fetching orders:", err.message);
            }
        }

        getOrders();
    }, []);

    async function delivered(id){
        let orderRef = doc(db, "order", id);
        alert("working")
        try{
            await updateDoc(orderRef, {
                status: 'delivered'
            })
        }catch(err){
            alert(err.message);
        }
    }

    return (
        <div className="mt-4">
            <form className="max-w-md mx-auto">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative w-80">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search orders..." required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
           
            <div className="mt-20 flex flex-col justify-center items-center gap-2">
                {orders.map((order) => (
                    <div key={order.id} className="w-full max-w-2xl border border-gray-200 rounded-lg p-4 mb-4">
                        <h2 className="font-bold text-lg mb-2">Order ID: {order.id}</h2>
                        {order.items && order.items.map((item, index) => (
                            <div key={index} className="flex items-center border-t border-gray-100 py-2">
                                <img src={item.img || Package} alt={item.FoodName} className="w-[100px] h-[100px] object-cover mr-4" />
                                <div className="flex-grow">
                                    <p className="font-bold">{item.FoodName}</p>
                                    <p>Price: ${item.Fprice}</p>
                                    <p>Quantity: {item.quantity}</p>
                                </div>
                                
                            </div>
                        ))}
                        <div className='text-center'>
                        <button 
                        onClick={() =>  delivered(order.id)}
                        className="bg-green-500 hover:bg-green-600 text-center text-white font-bold py-2 px-4 rounded">
                                    Delivered
                                </button>
                        </div>
                        
                        <p className="mt-2 font-bold">Total: ${order.totalPrice?.toFixed(2) || 'N/A'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;