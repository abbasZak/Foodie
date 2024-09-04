import { MdDashboard } from "react-icons/md";
import { CiShoppingBasket } from "react-icons/ci";
import { MdOutlineFastfood } from "react-icons/md";
import AddProduct from "./AddProduct";
import { IoIosAdd } from "react-icons/io";
import Products from "./Products";
import Orders from "./orders";
import { useState } from "react";
import Test from "./Test";

function Admin() {
    const [activeContent, setActiveContent] = useState(<AddProduct />);
    const [activeTab, setActiveTab] = useState('addProduct');

    function changeContent(content) {
        if (content === 'addProduct') {
            setActiveContent(<AddProduct />);
        } else if (content === 'orders') {
            setActiveContent(<Orders />);
        } else if (content === 'products') {
            setActiveContent(<Products />);
        }
        setActiveTab(content);
    }

    return (
        <div className="flex flex-col md:flex-row">
            <div className="md:h-screen w-full md:w-20 bg-slate-900 md:fixed">
                <div className="flex md:flex-col justify-around md:justify-start items-center gap-4 md:gap-8 p-4 md:mt-[240%]">
                    <div className={`hover:bg-slate-800 p-2 md:p-4 ${activeTab === 'addProduct' ? 'bg-slate-800' : ''}`}>
                        <IoIosAdd size={28} className="text-white cursor-pointer"
                            onClick={() => changeContent('addProduct')}
                        />
                    </div>

                    <div className={`hover:bg-slate-800 p-2 md:p-4 ${activeTab === 'orders' ? 'bg-slate-800' : ''}`}>
                        <CiShoppingBasket
                            size={28}
                            className="text-white cursor-pointer"
                            onClick={() => changeContent('orders')}
                        />
                    </div>

                    <div className={`hover:bg-slate-800 p-2 md:p-4 ${activeTab === 'products' ? 'bg-slate-800' : ''}`}>
                        <MdOutlineFastfood
                            size={28}
                            className="text-white cursor-pointer"
                            onClick={() => changeContent('products')}
                        />
                    </div>
                </div>
            </div>

            <div className="md:ml-20 w-full">
                {activeContent}
            </div>
        </div>
    );
}

export default Admin;