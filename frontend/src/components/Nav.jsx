import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { asyncLogoutUsers } from '../store/actions/userActions';
import { toast } from 'react-toastify';

const Nav = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const LogoutHandler = () => {
    dispatch(asyncLogoutUsers());
    toast.error("User Logged-Out");
    alert("Logged-Out");
  };

	return (
		<nav className="bg-blue-600 shadow-lg">
			<div className="max-w-7xl mx-auto px-4">
				<div className="flex justify-between">
					<div className="flex space-x-7">
						<div>
							<NavLink to="/" className="flex items-center py-4 px-2">
								<span className="font-semibold text-white text-lg">
									NexMart
								</span>
							</NavLink>
						</div>
						<div className="hidden md:flex items-center space-x-1">
							<NavLink
								to="/"
								className="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300"
							>
								Home
							</NavLink>
							<NavLink
								to="/products"
								className="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300"
							>
								Products
							</NavLink>
							{user && user.isAdmin && (
								<NavLink
									to="/admin/create-product"
									className="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300"
								>
									Create Product
								</NavLink>
							)}
						</div>
					</div>
					<div className="hidden md:flex items-center space-x-3 ">
						<NavLink
							to="/cart"
							className="py-4 px-2 text-white font-semibold hover:text-green-500 transition duration-300"
						>
							Cart
						</NavLink>
						{user ? (
							<>
								<NavLink
									to="/profile"
									className="py-2 px-2 font-medium text-white rounded hover:bg-green-500 hover:text-white transition duration-300"
								>
									Profile
								</NavLink>
								<button
									onClick={LogoutHandler}
									className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
								>
									Log Out
								</button>
							</>
						) : (
							<NavLink
								to="/login"
								className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
							>
								Log In
							</NavLink>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
