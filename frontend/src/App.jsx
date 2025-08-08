import React, { use, useEffect } from 'react'
import axios from './api/Axiosconfig'
import { useDispatch, useSelector } from "react-redux";
import { Mainroutes } from './routes/Mainroutes';
import Nav from "./components/nav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { asyncCurrentUsers } from './store/actions/userActions';
import { asyncLoadProduct } from './store/actions/productActions';


const App = () => {
      
      const dispatch = useDispatch();
      const {users } = useSelector((state) => state.userReducer);
      const {products} = useSelector((state) => state.productsReducer);

      useEffect(()=>{
        !users && dispatch(asyncCurrentUsers());
        // dispatch(asyncLoadProduct());
      },[users]);

      useEffect(()=>{
        // dispatch(asyncCurrentUsers());
        products.length == 0 && dispatch(asyncLoadProduct());
      },[products]);

  return (
    <div className='text-white  font-thin w-screen h-screen bg-white overflow-auto'>
      <ToastContainer/>
      <Nav/>
      <Mainroutes/>
    </div>
  )
}

export default App
