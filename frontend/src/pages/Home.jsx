import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="w-full ">
			<div className="relative h-[100vh] bg-gray-900">
				<div className="absolute inset-0">
					<img
						className="w-full h-[90vh] object-cover"
						src="https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="Fashion"
					/>
					<div className="absolute inset-0 bg-black opacity-50"></div>
				</div>
				<div className="relative max-w-7xl mx-auto py-34 pt-10 px-10 sm:py-32 sm:px-6 lg:px-8 text-center">
					<h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
						Discover Your Style
					</h1>
					<p className="mt-6 text-xl text-gray-300">
						Browse our curated collection of the latest trends and timeless
						classics.
					</p>
					<Link
						to="/products"
						className="mt-8 inline-block bg-white border border-transparent rounded-md py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100"
					>
						Shop Now
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
