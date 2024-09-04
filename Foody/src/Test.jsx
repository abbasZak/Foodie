import { useState, useEffect } from "react";
import Editmodal from "./Editmodal";
import { db } from "./config/firebase";
import {  onSnapshot, collection } from "firebase/firestore";


function Test(){
    // const [showEdit, setShowEdit] = useState(false);
    // const [productList, setProductList] = useState([]);

    // function hideEdit(){
    //     setShowEdit(false);
    // }

    // function Edit(id){

    // }

    // useEffect(() => {
    //     const productRef = collection(db, 'Products');
    //     const unsubscribe = onSnapshot(productRef, (snapshot) => {
    //         const products = snapshot.docs.map((doc) => ({
    //             ...doc.data(),
    //             id: doc.id,
    //         }));
    //         setProductList(products);
    //     });
    
    //     // Cleanup function
    //     return () => unsubscribe();
    // }, []);


    

    return(
        <div className="flex items-center justify-center min-h-screen bg-grayNew p-4">
            
            <div className="w-full max-w-4xl bg-grayNew rounded-lg shadow-lg overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Food Name
                            </th>
                            <th className="py-2 px-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="py-2 px-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Food desc
                            </th>
                            
                            <th className="py-2 px-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>

                            <th className="py-2 px-3 border-b border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        
                        

                        
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Test;