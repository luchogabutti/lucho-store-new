import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './screens/Home'
import Products from './screens/products'
import NavBar from './components/NavBar'
import NewProduct from './screens/new-product/Layout';
import ProductDetails from './screens/product-details';
import './App.css'

function App() {

  return (
      <>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/products' element={<Products />}></Route>
          <Route path='/new-product' element={<NewProduct />}></Route>
          <Route path='/products/:id/edit' element={<NewProduct />}></Route>
          <Route path='/product-detail/:id' element={<ProductDetails/>}></Route>
        </Routes>
      </>
  );
}

export default App;
