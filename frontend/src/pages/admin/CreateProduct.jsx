import { nanoid } from '@reduxjs/toolkit';
import React from 'react'
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom";
import { asyncRegisterUsers } from '../../store/actions/userActions';
import { useDispatch } from 'react-redux';
import { asyncCreateProduct } from '../../store/actions/productActions';

const CreateProduct = () => {
  const {register , reset , handleSubmit} = useForm();
  const dispatch = useDispatch();
  const Navigate= useNavigate();
  const CreateProductHandler = (product)=>{
      product.id=nanoid();
     
      console.log(product);
      dispatch(asyncCreateProduct(product));
      Navigate("/products")
  }
  return (
    <div className='flex justify-center items-center bg-blue-300 w-full h-full mx-auto'>
    <form  onSubmit={handleSubmit(CreateProductHandler)} className=' text-gray-500 flex flex-col justify-start items-start bg-white p-25 rounded'>
      <h1 className='text-3xl '>Add Products</h1>
      <input
      {...register("title")}
          type="text" 
          placeholder='title' 
          className='mb-3 outline-0 border-b p-2 text-2xl'/>
      <input
      {...register("price")}
          type="text" 
          placeholder='price' 
          className='mb-3 outline-0 border-b p-2 text-2xl'/>
     <textarea 
          {...register("description")}
          type="text" 
          placeholder='description' 
          className='mb-3 outline-0 border-b p-2 text-2xl' >     
      </textarea>
      <input
      {...register("category")}
          type="text" 
          placeholder='category' 
          className='mb-5 outline-0 border-b p-2 text-2xl'/>
      <input
      {...register("image")}
          type="url" 
          placeholder='Add Image Url'
          className='mb-3 outline-0 border-b p-2 text-2xl'
          />   
      <button
         className='h-10 w-30 bg-red-500 text-white rounded active:scale-105'
      >Add Product</button>    
    </form>
    </div>
  )
}
export default CreateProduct;