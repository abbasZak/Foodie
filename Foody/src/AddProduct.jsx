import { db, storage } from './config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { v4 } from 'uuid';
import { useState } from 'react';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const [imgFile, setImgFile] = useState(null);
    const [productName, setProductName] = useState("");
    const [foodDesc, setFoodDesc] = useState("");
    const [price, setPrice] = useState("");

    const Upload = async (e) => {
        e.preventDefault();
        if (!imgFile) {
            alert("Please select an image file.");
            return;
        }
        
        try {
            const imgRef = ref(storage, `products/${imgFile.name + v4()}`);
            const uploadTask = await uploadBytes(imgRef, imgFile);
            const imgurl = await getDownloadURL(uploadTask.ref);

            const productRef = collection(db, "Products");
            await addDoc(productRef, {
                Fdesc: foodDesc,
                Fname: productName,
                Fprice: price,
                img: imgurl                
            });

            setImgFile(null);
            setFoodDesc("");
            setProductName("");
            setPrice("");

            toast.success("Product added successfully!");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="mt-[10%] ml-[10%] sm:ml-0">
                <form className="max-w-[80%] mx-auto">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">
                        Upload file
                    </label>
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="user_avatar_help"
                        id="user_avatar"
                        type="file"
                        onChange={(e) => setImgFile(e.target.files[0])}
                        
                    />

                    <div className="mb-5">
                        <label htmlFor="pname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Food Name
                        </label>
                        <input
                            type="text"
                            id="pname"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            onChange={(e) => setProductName(e.target.value)}
                            value={productName}
                            required
                        />
                    </div>
                    
                    <div className="mb-5">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Food Description
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setFoodDesc(e.target.value)}
                            value={foodDesc}
                            required
                        ></textarea>
                    </div>
                    
                    <div className="mb-5">
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Price
                        </label>
                        <input
                            type="text"
                            id="price"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
                        onClick={Upload}
                    >
                        Add Food
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
