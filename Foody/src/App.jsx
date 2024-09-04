import React, { useState } from "react";
import Home from "./Home";
import Categories from "./Categories";
import Menu from "./Menu";
import Admin from './Admin';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
 
  return (
    <div>
      <ToastContainer />

      
      
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>      
      

     
      
      
    </div>
  );
}

export default App;
