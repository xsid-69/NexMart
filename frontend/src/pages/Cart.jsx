import React, { useState } from "react";
import {
	useSelector,
	useDispatch
} from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	Link
} from "react-router-dom";
import {
	incrementQuantity,
	decrementQuantity,
	removeFromCart,
} from "../store/actions/cartActions";

const Cart = () => {
	const {
		user
	} = useSelector((state) => state.userReducer);
	const cartItems = user?.cart || [];
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showPopup, setShowPopup] = useState(false);

	const handleCheckout = () => {
		setShowPopup(true);
		setTimeout(() => {
			setShowPopup(false);
			navigate("/");
		}, 2000);
	};

	const handleIncrement = (id) => {
		dispatch(incrementQuantity(id));
	};

	const handleDecrement = (id) => {
		dispatch(decrementQuantity(id));
	};

	const handleRemove = (id) => {
		dispatch(removeFromCart(id));
	};

	const calculateTotal = () => {
		return cartItems
			.reduce((total, item) => total + item.price * item.quantity, 0)
			.toFixed(2);
	};

	if (!cartItems || cartItems.length === 0) {
		return (
			<div className="text-center py-20 bg-blue-200 h-full">
				<h1 className="text-3xl font-bold text-black">Your cart is empty</h1>
				<Link
					to="/products"
					className="mt-4 inline-block bg-green-500 text-white px-6 py-2 rounded-full"
				>
					Shop Now
				</Link>
			</div>
		);
	}

	return (
		<div className="container h-full top-0 bg-blue-400">
			<div className="flex shadow-md my-10">
				<div className="w-3/4 h-full bg-blue-300 px-10 py-10">
					<div className="flex justify-between border-b pb-8">
						<h1 className="font-semibold text-2xl">Shopping Cart</h1>
						<h2 className="font-semibold text-2xl">
							{cartItems.length} Items
						</h2>
					</div>
					<div className="flex mt-10 mb-5">
						<h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
							Product Details
						</h3>
						<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
							Quantity
						</h3>
						<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
							Price
						</h3>
						<h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
							Total
						</h3>
					</div>
					{cartItems.map((item) => (
						<div
							className="flex items-center hover:bg-blue-400 -mx-8 px-6 py-5"
							key={item.id}
						>
							<div className="flex w-2/5">
								<div className="w-20">
									<img className="h-24" src={item.image} alt={item.title} />
								</div>
								<div className="flex flex-col justify-between ml-4 flex-grow">
									<span className="font-bold text-sm">{item.title}</span>
									<span className="text-red-500 text-xs">{item.category}</span>
								</div>
							</div>
							<div className="flex justify-center w-1/5">
								<button onClick={() => handleDecrement(item.id)}>-</button>
								<span className="text-center w-full font-semibold text-sm">
									{item.quantity}
								</span>
								<button onClick={() => handleIncrement(item.id)}>+</button>
							</div>
							<span className="text-center w-1/5 font-semibold text-sm">
								₹{item.price.toFixed(2)}
							</span>
							<span className="text-center w-1/5 font-semibold text-sm">
								₹{(item.price * item.quantity).toFixed(2)}
							</span>
							<button
								onClick={() => handleRemove(item.id)}
								className="font-semibold hover:text-red-500 text-gray-500 text-xs"
							>
								Remove
							</button>
						</div>
					))}
				</div>

				<div id="summary" className="w-1/4 px-8 py-10">
					<h1 className="font-semibold text-2xl border-b pb-8">
						Order Summary
					</h1>
					<div className="flex justify-between mt-10 mb-5">
						<span className="font-semibold text-sm uppercase">
							Items {cartItems.length}
						</span>
						<span className="font-semibold text-sm">₹{calculateTotal()}</span>
					</div>

					<div className="border-t mt-8">
						<div className="flex font-semibold justify-between py-6 text-sm uppercase">
							<span>Total cost</span>
							<span>₹{calculateTotal()}</span>
						</div>
						<button
							onClick={handleCheckout}
							className="bg-green-500 font-semibold hover:bg-green-600 py-3 text-sm text-white uppercase w-full"
						>
							Checkout
						</button>
					</div>
				</div>
			</div>
			{showPopup && (
				<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-8 rounded-lg shadow-lg">
						<h2 className="text-2xl font-bold text-green-500">Order Placed!</h2>
					</div>
				</div>
			)}
		</div>
	);
};

export default Cart;
