import React from "react";
import { Routes, Route } from 'react-router-dom';

import { ProductForm } from "../features/products/components/ProductForm";
import Home from '../features/Home/Home';
import Register from '../features/auth/Register';
import Login from '../features/auth/Login';
import Header from "../features/common/components/header/Header";
import PublicRoute from "../features/routes/PublicRoute";

function App() {
  return (
   
      <div className='min-h-screen'>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product' element={<ProductForm />} />
            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
            <Route path='*' element={<p>Not Found</p>} />
          </Routes>
        </main>
      </div>
  
  );
}

export default App;