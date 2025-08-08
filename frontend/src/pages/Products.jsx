import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { asyncAddToCart } from "../store/actions/cartActions";
import axios from "../api/Axiosconfig";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
	const dispatch = useDispatch();
	const {
		userReducer: { user },
	} = useSelector((state) => state);
	const [products, setproduct] = useState([]);
	const [loading, setLoading] = useState(false);
	const AddtoCarthandler = (product) => {
		dispatch(asyncAddToCart(user, product));
	};
	const [hasMore, sethasMore] = useState(true);
	const fetchProducts = async () => {
		setLoading(true);
		try {
			// Simulate a network delay
			await new Promise((resolve) => setTimeout(resolve, 1000));
			const { data } = await axios.get(
				`/products?_limit=10&_start=${products.length}`
			);
			if (data.length === 0) {
				sethasMore(false);
			} else {
				setproduct([...products, ...data]);
			}
		} catch (error) {
			console.error("Error fetching products:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (products.length === 0) {
			fetchProducts();
		}
	}, []);
	const renderProducts = products.map((product) => {
		return (
			<div
				className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4 bg-gray-100"
				key={product.id}
			>
				<div className="bg-blue-170 rounded-lg shadow-lg overflow-hidden ">
					<Link to={`/product/${product.id}`}>
						<img
							className="w-full h-64 object-cover"
							src={product.image}
							alt={product.title}
						/>
					</Link>
					<div className="p-6">
						<h2 className="text-xl font-bold text-gray-800 truncate">
							{product.title}
						</h2>
						<p className="text-gray-600 mt-2">{product.category}</p>
						<div className="flex items-center justify-between mt-4">
							<span className="text-2xl font-bold text-gray-800">
								₹{product.price}
							</span>
							<button
								onClick={() => AddtoCarthandler(product)}
								className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
							>
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	});

	if (loading && products.length === 0) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className="w-full bg-gray-100">
			<div className="container mx-auto px-4 py-8">
				<div id="scrollableDiv" style={{ height: "80vh", overflow: "auto" }}>
					<InfiniteScroll
						dataLength={products.length}
						loader={<h4 className="text-center text-xl font-bold py-4">Loading...</h4>}
						hasMore={hasMore}
						next={fetchProducts}
						scrollableTarget="scrollableDiv"
					>
						<div className="flex flex-wrap -mx-4">{renderProducts}</div>
					</InfiniteScroll>
				</div>
			</div>
		</div>
	);
  
};

export default Products;
