import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { asyncdeleteProduct, asyncupdateProduct } from '../../store/actions/productActions';
import { asyncAddToCart } from '../../store/actions/cartActions';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productsReducer: { products }, userReducer: { user } } = useSelector((state) => state);
  const product = products?.find((product) => product.id == id);
  const AddtoCarthandler = (product) => {
      dispatch(asyncAddToCart(user, product));
    };

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      image: product?.image,
      title: product?.title,
      price: product?.price,
      category: product?.category,
      description: product?.description,
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        image: product.image,
        title: product.title,
        price: product.price,
        category: product.category,
        description: product.description,
      });
    }
  }, [product, reset]);
  
  const Deletehandler = (id)=> {
    dispatch(asyncdeleteProduct(id));
    navigate(-1)
  }

  const UpdateProductHandler = (data) => {
    const updatedProduct = { ...product, ...data };
    dispatch(asyncupdateProduct(updatedProduct));
    navigate(-1)
  };
  if (!product) {
    return <div className="text-center text-2xl mt-10">Product not found or loading...</div>;
  }

  return product?(
    < >
       <div key={product.id} className='bg-blue-100 text-gray-800 h-[80vh] p-10 flex'>
        <div className='w-[35%]'>
          <img className='object-cover h-[70vh] ' src={product.image}/>
       </div>
       <div className='p-5 w-[60%]'>
          <h1 className='font-bold text-4xl border-b-2 '>{product.title}</h1>
          <small className='mb-5'>{product.description}</small>
          <h1 className='text-5xl font-bold mt-5'><sup>₹</sup>{product.price}</h1>
          <h3 className='mt-5 text-gray-400'>{product.category}</h3>
          <button onClick={() => AddtoCarthandler(product)} className='w-[80vh] text-center bg-amber-500 p-4 text-white mt-5 rounded'>Add to Cart</button>
           <button className='w-[80vh] text-center bg-red-500 p-4 text-white mt-5 rounded'>Buy Now!</button>
       </div>
       </div>
       <hr className='m-3' />
       {user && user?.isAdmin && (<div className='flex bg-blue-300 justify-center items-center p-5'>
        <form  onSubmit={handleSubmit(UpdateProductHandler)} className='flex flex-col justify-start items-start rounded-2xl bg-blue-400 p-20'>
      <h1 className='text-3xl text-center text- m-5 font-bold'>Edit Product Details</h1>
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
        {...register('description')}
        placeholder="description"
        className="mb-3 outline-0 border-b p-2 text-2xl"
      ></textarea>
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
         className='h-10 w-30 mb-5 bg-blue-500 rounded active:scale-105'
      >Update Product</button>   
       
    </form>
      <button
      onClick={()=>Deletehandler(product.id)}
       className='h-10 w-30  bg-red-500 rounded active:scale-105'>
        Delete Product
      </button>
       </div>)}
       
    </>
  ):"Loading..";
}

export default ProductDetails;
