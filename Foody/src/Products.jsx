import { useState, useEffect } from "react";
import Editmodal from "./Editmodal";
import { db } from "./config/firebase";
import { updateDoc, onSnapshot, collection, doc, deleteDoc } from "firebase/firestore";


const Products = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [productList, setProductList] = useState([]);
    const [FoodName, setFoodName] = useState("");
    const [FoodDesc, setFoodDesc] = useState("");
    const [FoodPrice, setFoodPrice] = useState("");
    const [curentProductId, setCurrentProductsId] = useState({});

    function hideEdit(){
        setShowEdit(false);
    }
    

    async function Edit(id){
        setShowEdit(!false);
        
        setCurrentProductsId(id);


    }

    async function DeleteProduct(id){
        try{
            let productRef = doc(db, "Products", id);
            await deleteDoc(productRef);
        }catch(err){
            alert(err.message)
        }
    }

    async function Save() {
        try{
            let productRef = doc(db, "Products", curentProductId);
            await updateDoc(productRef, {
                Fdesc: FoodDesc, 
                Fname: FoodName,
                Fprice: FoodPrice
            })

        }catch(err){
            alert(err.message);
        }

    }

    

    useEffect(() => {
        const productRef = collection(db, 'Products');
        const unsubscribe = onSnapshot(productRef, (snapshot) => {
            const products = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setProductList(products);
        });
    
        // Cleanup function
        return () => unsubscribe();
    }, []);


    

    return(
        <div className="flex items-center justify-center min-h-screen bg-grayNew p-4">
            <Editmodal open={showEdit} onClose={hideEdit}>
            <div className="z-10">
                    <h1 className="font-bold text-2xl">Update Record</h1>
                    <br />
                    <input
                        type="text"
                        placeholder="Enter product name"
                        onChange={(e) => setFoodName(e.target.value)}
                        value={FoodName}
                        
                        className="mb-2 p-2 border rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="Enter product price"
                        onChange={(e) => setFoodPrice(e.target.value)}
                        value={FoodPrice}
                        className="mb-2 p-2 border rounded w-full"
                    />
                    <textarea
                        placeholder="Enter product description"
                        value={FoodDesc}
                        onChange={(e) => setFoodDesc(e.target.value)}
                        className="mb-2 p-2 border rounded w-full"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={Save}
                    >
                        Save
                    </button>
                </div>

            </Editmodal>

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
                        
                        {
                            productList.map((item) => (
                                <tr
                                key={item.id}
                                >
                                    <td className="py-3 px-3 border-b border-gray-200 text-sm">{item.Fname}</td>
                                    <td className="py-3 px-3 border-b border-gray-200 text-sm">{`₦${item.Fprice}`}</td>
                                    <td className="py-3 px-3 border-b border-gray-200 text-sm">{item.Fdesc}</td>
                                    <td className="py-3 px-3 border-b border-gray-200 text-sm">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs" onClick={ () => Edit(item.id)}>
                                            Edit
                                        </button>
                                    </td>

                                    <td className="py-3 px-3 border-b border-gray-200 text-sm">
                                        <button 
                                        onClick={() => DeleteProduct(item.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-xs">
                                            DELETE
                                        </button>
                                    </td>
                        </tr>
                            ))
                        }


                        
                        
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Products;