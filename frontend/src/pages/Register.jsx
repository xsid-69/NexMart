import { nanoid } from '@reduxjs/toolkit';
import React from 'react'
import {useForm} from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom";
import { asyncRegisterUsers } from '../store/actions/userActions';
import { useDispatch } from 'react-redux';

const Register = () => {
  const {register , reset , handleSubmit} = useForm();
  const dispatch = useDispatch();
  const Navigate= useNavigate();
  const RegisterHandler = (user)=>{
      user.id=nanoid();
      user.isAdmin=false;
      user.cart=[];
      // console.log(user);
      dispatch(asyncRegisterUsers(user));
      Navigate("/login")
  }
	return (
		<div className="flex items-center justify-center min-h-screen bg-blue-300">
			<div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
				<div className="flex flex-col justify-center p-8 md:p-14">
					<span className="mb-3 text-4xl font-bold">Create an Account</span>
					<span className="font-light text-gray-400 mb-8">
						Please fill in the details to register
					</span>
					<form onSubmit={handleSubmit(RegisterHandler)}>
						<div className="py-4">
							<span className="mb-2 text-md text-gray-400">Name</span>
							<input
								{...register("name")}
								type="text"
								className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
							/>
						</div>
						<div className="py-4">
							<span className="mb-2 text-md  text-gray-400">Username</span>
							<input
								{...register("username")}
								type="text"
								className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
							/>
						</div>
						<div className="py-4">
							<span className="mb-2 text-md  text-gray-400">Email</span>
							<input
								{...register("email")}
								type="email"
								className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
							/>
						</div>
						<div className="py-4">
							<span className="mb-2 text-md  text-gray-400">Password</span>
							<input
								{...register("password")}
								type="password"
								className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
							/>
						</div>

						<button
							type="submit"
							className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300"
						>
							Register
						</button>
					</form>
					<div className="text-center text-gray-400">
						Already have an account?
						<Link to="/login" className="font-bold text-black">
							Sign in
						</Link>
					</div>
				</div>

				<div className="relative">
					<img
						src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074076.jpg"
						alt="img"
						className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
					/>
				</div>
			</div>
		</div>
	);
}             

export default Register
