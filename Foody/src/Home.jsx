import { IoSearchOutline } from "react-icons/io5";
import { FaCartPlus, FaTrashAlt, FaUser } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { LuAlarmClock } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { MdCancel } from "react-icons/md";
import Modal from './Modal';
import shawarma from './images/shawarma.png';
import burger from './images/burger.png';
import { auth, db } from './config/firebase';
import { doc, setDoc, getDoc, addDoc, Firestore } from 'firebase/firestore';
import SidebarModal from './sidebarModal';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import chickenshawarma from './images/chickenshawarma.jpg'; 
import Menu from "./Menu";
import Categories from "./Categories";
import { getDocs, collection, query, where, deleteDoc, onSnapshot } from 'firebase/firestore'



const Home = (props) => {
    const [orderNum, setOrder] = useState(0);
    const [visitor, setVisitor] = useState(0);
    const [happyCustomersNum, setHappyCustomers] = useState(0);
    const [isActive, setActive] = useState(false);
    const [sideBarActive, setSidebarActive] = useState(false);
    const [show, setShow] = useState(true);
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [signEmail, setsignEmail] = useState("");
    const [signPassword, setsignPassword] = useState("");
    const [User, setUser] = useState(null);
    const [displayName, setDisplayName] = useState("");
    const [isLoading, setLoading] = useState(false);
    const[quantity, setQuantity] = useState(1);
    const[productList, setProductList] = useState([]);    
    
    


    

    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userDocRef = doc(db, 'users', currentUser.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setDisplayName(`${userData.firstName}`);
                }
            } else {
                setUser(null);
                setDisplayName("");
            }
        });

        

        return () => unsubscribe();
    }, []);

    const signUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, Email, Password);
            const user = userCredential.user;

            if (user) {
                await setDoc(doc(db, "users", user.uid), {
                    firstName: FirstName,
                    lastName: LastName,
                    email: user.email,

                });
                console.log("User created successfully");
                toast.success("Account created successfully", {
                    position: "top-center"
                });
            }
        } catch (err) {
            console.error("Error creating user:", err);
            toast.error(err.message, {
                position: 'bottom-center'
            });
        }
    };

    const signIn = async (e) => {
        e.preventDefault();
        setsignEmail("");
        setsignPassword("");
        
        setLoading(true);
        try {
            const signInCredential = await signInWithEmailAndPassword(auth, signEmail, signPassword);

           setActive(false);
           setLoading(false); 
           
            toast.success('Successfully signed in', {
                position: 'top-center'
            });

        } catch (err) {
            toast.error(err.message, {
                position: 'bottom-center'
            });

            setLoading(false);
        }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
            toast.success("Sign out successful", {
                position: "top-right"
            });
        } catch (err) {
            toast.error(err.message, {
                position: "top-right"
            });
        }
    }

    
        


    function RegisterShow() {
        setShow(!show);
    }

    function NotShow() {
        setShow(true);
    }

    function showSidebar() {
        setSidebarActive(!sideBarActive);
    }

    function hideSidebar() {
        setSidebarActive(false);
    }

    const orderComplete = 500;
    const visitorNum = 400;
    const happyCustomers = 800;

    function showRegisterForm() {
        setActive(true);
    }

    function hideRegisterForm() {
        setActive(false);
    }

    useEffect(() => {
        const orderInterval = setInterval(() => {
            setOrder(prevOrder => {
                if (prevOrder >= orderComplete) {
                    clearInterval(orderInterval);
                    return prevOrder;
                }
                return prevOrder + 1;
            });
        }, 10);

        return () => clearInterval(orderInterval);
    }, [orderComplete]);

    useEffect(() => {
        const orderInterval2 = setInterval(() => {
            setVisitor(prevOrder => {
                if (prevOrder >= visitorNum) {
                    clearInterval(orderInterval2);
                    return prevOrder;
                }
                return prevOrder + 1;
            });
        }, 10);


        return () => clearInterval(orderInterval2);
    }, [visitorNum]);

    useEffect(() => {
        const orderInterval3 = setInterval(() => {
            setHappyCustomers(prevOrder => {
                if (prevOrder >= happyCustomers) {
                    clearInterval(orderInterval3);
                    return prevOrder;
                }
                return prevOrder + 1;
            });
        }, 10);

        return () => clearInterval(orderInterval3);
    }, [happyCustomers]);

    const [cart, setCart] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "Products"), (snapshot) => {
          const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setProductList(products);
        });
      
        // Cleanup the listener on unmount
        return () => unsubscribe();
      }, []);

    const addToCart =  async (product) => {
        try{
            if (!User) {
                setActive(true); // Show login modal
                
            } else {
                // Add the product to the cart
                let cartRef = collection(db, "cart");
                await addDoc(cartRef, {
                    userid: User.uid,
                    Fname: product.Fname,
                    Fprice: product.Fprice,
                    img: product.img,
                    quantity: quantity  
                })

                toast("Cart added successfully");
                
            }
        }catch(err){
            alert(err.message);
        }
        
    };

    useEffect(() => {
        const getCart = async () => {
            if (!User) {
                console.log("No user logged in");
                return;
            }
    
            const cartRef = collection(db, "cart");

            
            const q =  query(cartRef, where("userid", "==", User.uid));
    
            try {
                onSnapshot(q, (snapshot) => {
                    const items = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id
                    }))
                    setCart(items);
                })
                // const querySnapshot = await getDocs(q);
                // const filteredData = querySnapshot.docs.map((doc) => ({
                //     ...doc.data(),
                //     id: doc.id
                // }));
                
                console.log("Cart items:", filteredData);
            } catch (err) {
                console.error("Error fetching cart:", err.message);
            }
        };
    
        getCart();
    }, [User]);


    
    
  function incrementQuantity(productId){
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId? {...item, quantity: item.quantity + 1}: item

      )

     )
  
    }

    function handleRemoveFromCart(index){
      setCart(prevCart => 
        prevCart.filter((_, i) =>  i !== index )

      ) 
    }


  function decrementQuantity(productId){
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId? {...item, quantity: item.quantity - 1}: item

      )

     )
  }

  const deleteItems = async (id) => {
    try{
        await deleteDoc(doc(db, "cart", id));
        
       
    }catch(err){
        alert(err.message);
    }
  }

  
  const getOrder = async (userId) => {
    let cartRef = collection(db, "cart");
    let orderRef = collection(db, "order");
    try {
        // Query to get only the current user's cart items
        const q = query(cartRef, where("userid", "==", userId));
        let querySnapshot = await getDocs(q);
        let cartItems = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        
        
        if (cart.length > 0) {
            // Create a new order with all cart items
            const newOrder = {
                userId: userId,
                items: cart.map(item => ({
                    FoodName: item.Fname,
                    Fprice: item.Fprice,
                    quantity: item.quantity,
                    img: item.img
                })),
                totalPrice: cart.reduce((total, item) => total + (item.Fprice * item.quantity), 0),
                orderDate: new Date(),
                status: "pending"
            };

            // Add the new order to Firestore
            const docRef = await addDoc(orderRef, newOrder);
            console.log('Order added successfully with ID: ', docRef.id);

            // Clear the user's cart
            const deletePromises = cart.map(item => deleteDoc(doc(cartRef, item.id)));
            await Promise.all(deletePromises);
            console.log('Cart cleared successfully');

            // Here you might want to update your UI or state
            // For example: setCart([]);

            // Show a success message to the user
            toast.success('Order placed successfully!', {
                position: "top-center"
            });
        } else {
            console.log('Cart is empty');
            toast.warning('Your cart is empty', {
                position: "top-center"
            });
        }
    } catch (err) {
        console.error('Error processing order:', err.message);
        toast.error('Error placing order. Please try again.', {
            position: "top-center"
        });
    }
};

  let total = cart.reduce((acc, item) => acc + item.Fprice * item.quantity , 0)

    return (
    <div>
        <section className="flex flex-col-reverse sm:flex-row bg-white justify-between">
            <ToastContainer />
            <div className="p-4 flex flex-col gap-12 h-screen w-full">
                <h1 className="text-myorange text-6xl font-bold">Foody</h1>
                <div className="max-w-96 flex flex-col gap-6">
                    <h1 className="text-4xl">A <span className="text-myorange">Good Food</span> Makes a Great Health</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                </div>
                <div className="bg-white shadow-2xl p-4 rounded-md flex w-72">
                    <IoSearchOutline size={28} className="mt-2" />
                    <form action="#" className="flex">
                        <input type="text" placeholder="Search here" className="w-full p-2 outline-none" />
                        <button className="bg-myorange p-2 text-white max-w-40 rounded-md hover:bg-orange-400 transition-all">
                            Search
                        </button>
                    </form>
                </div>
                <div className="flex gap-8" id="info">
                    <div id="box1">
                        <h4 className="text-myblue text-4xl font-bold">{orderNum}</h4>
                        <p>Orders completed</p>
                    </div>
                    <div id="box1">
                        <h4 className="text-myblue text-4xl font-bold">{visitor}</h4>
                        <p>Regular visitor</p>
                    </div>
                    <div id="box1">
                        <h4 className="text-myblue text-4xl font-bold">{happyCustomersNum}</h4>
                        <p>Happy customers</p>
                    </div>
                </div>
            </div>
            <Modal open={isActive} onClose={hideRegisterForm}>
                <div className="z-50">
                    <form action="" className={`flex flex-col gap-2 ${show ? "flex" : "hidden"} z-50`}>
                        <div className="flex justify-between">
                            <label className="text-2xl font-bold">Sign up</label>
                            <MdCancel className="mt-2 cursor-pointer" onClick={hideRegisterForm} />
                        </div>
                        <hr />
                        <br />
                        <input
                            type="text"
                            placeholder="First Name"
                            className="border p-2"
                            value={FirstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            className="border p-2"
                            value={LastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            className="border p-2"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border p-2"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="">Already have an account? <a href="#" className="text-myblue" onClick={RegisterShow}>Sign in</a></div>
                        <div className="bg-red-400 text-white p-2 text-center hidden rounded-sm text-sm opacity-0">xcxc</div>
                        <button
                            className="bg-myorange p-2 rounded-md text-white hover:shadow-lg"
                            onClick={signUp}
                        >
                            Create Account
                        </button>
                    </form>
                    <form action="" className={`flex flex-col gap-2 ${show ? "hidden" : "flex"}`}>
                        <div className="flex justify-between">
                            <label className="text-2xl font-bold">Sign In</label>
                            <MdCancel className="mt-2 cursor-pointer" onClick={hideRegisterForm} />
                        </div>
                        <hr />
                        <br />
                        <input
                            type="text"
                            placeholder="Email"
                            className="border p-2"
                            value={signEmail}
                            onChange={(e) => setsignEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border p-2"
                            value={signPassword}
                            onChange={(e) => setsignPassword(e.target.value)}
                        />
                        <div className="">Don't have an account? <a href="#" className="text-myblue" onClick={NotShow}>Sign up</a></div>
                        <button
                            className="bg-myorange p-2 rounded-md text-white hover:shadow-lg"
                            onClick={signIn}
                        >
                            {
                                isLoading? (
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 relative left-1/2 ml-[-10px]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                    <span class="sr-only">Loading...</span>
                               
                                    </div> 
                                ): (
                                   <h1>Login</h1>
                                )
                            }
                               
                            
                        </button>
                    </form>
                </div>
            </Modal>
            <div className="p-6 h-screen w-full" id="secondPart">
                <nav className="text-white">
                    <ul className="flex text-lg justify-evenly">
                        <li><a href="#" className="text-lg md:text-2xl hover:text-myorange font-bold">Home</a></li>
                        <li><a href="#" className="text-lg md:text-2xl hover:text-myorange font-bold">Categories</a></li>
                        <li><a href="#" className="text-lg md:text-2xl hover:text-myorange font-bold">Menu</a></li>
                        {User ? (
                            <>
                                <li>
                                    <div className="flex gap-1" id="logList">
                                        <FaUser  className="md:text-xl text-lg" />
                                        <span className="md:text-2xl text-lg">{displayName}</span>
                                        <div className="bg-white p-2 rounded-sm" id="logoutDiv">
                                            <a href="#" className="text-black" onClick={logOut}>Logout</a>
                                        </div>
                                    </div>
                                </li>
                            </>
                        ) : (
                            <li><a href="#" className="text-xl md:text-2xl hover:text-myorange font-bold" onClick={showRegisterForm}>Login</a></li>
                        )}
                        <div className="relative">
                            <div className="absolute top-[-12px] right-[-16px] bg-myorange rounded-full w-6 text-center">{cart.length}</div>
                            <FaCartPlus size={28} className={"cursor-pointer text-sm"} onClick={showSidebar} />
                        </div>
                    </ul>
                </nav>
                <div className="bg-white max-w-40 flex gap-4 align-middle rounded-md p-1 relative top-10">
                    <LuAlarmClock size={28} className="mt-2" />
                    <div>
                        <h2 className="text-myblue">Delivery</h2>
                        <p>30-35 min</p>
                    </div>
                </div>
                <div className="bg-white max-w-48 flex gap-4 align-middle rounded-md p-1 relative top-[440px]">
                    <TbTruckDelivery size={28} className="mt-4" />
                    <div>
                        <h2 className="text-myblue">Free</h2>
                        <p>Buy 1 get one free</p>
                    </div>
                </div>
            </div>
            <SidebarModal open={sideBarActive} onClose={hideSidebar}>
                <div>
                    <div className="bg-myorange text-white p-2">My Cart</div>
                    <br />

                    <div>
    {cart.length > 0 ? (
        cart.map((item, index) => (
        <div>
            <div key={index} className="flex justify-between items-center gap-2 p-2">
                <img src={item.img} alt={`${item.name} image`} className="w-20 h-20" />
                <div>
                    <h2 className="flex-grow">{item.Fname}</h2>
                    <p><span>₦</span>{item.Fprice}</p>
                    <div className="flex">
                        <button onClick={() => incrementQuantity(item.id)} className="bg-green-300 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">+</button>
                        <div className="flex items-center justify-center w-8">{item.quantity}</div>
                        <button onClick={() => decrementQuantity(item.id)} className="bg-red-300 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">-</button>
                        
                    </div>
                           
                </div>
                <FaTrashAlt size={28} onClick={() => deleteItems(item.id)} />
            </div>

            <div className="absolute bottom-0 right-[30%] w-36">
                        <p>Total Price: <span><span>₦</span>{total}</span></p>
                        <button className="bg-myorange w-full p-2 text-white rounded-md" onClick={() => getOrder(item.id)} >Confirm Order</button>
                    </div>
        </div>
            
        ))
    ) : (
        <div>Cart is empty</div> // Content for empty cart
    )}
</div>
                    
                    
                    
                    
                    
                    

                    
                     
                    
                </div>
            </SidebarModal>

          
           
        </section>

        <Categories />
        <Menu addToCart={addToCart} />

    </div>
    );
};

export default Home;
