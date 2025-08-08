import React from 'react'
import { Route , Routes } from "react-router-dom";
import  Home  from "../pages/Home";
import Products from '../pages/Products';
import Login from "../pages/Login";
import Register from '../pages/Register';
import Cart from '../pages/Cart';
import CreateProduct from '../pages/admin/CreateProduct';
import ProductDetails from '../pages/admin/ProductDetails';
import UserProfile from '../pages/users/UserProfile';




export const Mainroutes = () => {
  return (
    <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/products"  element={<Products/>}/>
        <Route path="/cart"  element={<Cart/>}/>
        <Route path="/login"  element={<Login/>}/>
        <Route path="/register"  element={<Register/>}/>

        <Route path="/admin/create-product"  element={<CreateProduct/>}/>
        <Route path="/product/:id"  element={<ProductDetails/>}/>
        <Route path="/profile"  element={<UserProfile/>}/>
    </Routes>
  )
}
