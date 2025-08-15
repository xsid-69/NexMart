import {
    addToCart as addToCartUser,
    increment as incrementUser,
    decrement as decrementUser,
    remove as removeUser,
} from "../reducers/userSlice";
import {
    addToCart,
    increment,
    decrement,
    remove
} from "../reducers/cartSlice";
import { useNavigate } from "react-router-dom";

export const asyncAddToCart = (user, product) => (dispatch) => {
    const navigate = useNavigate();
    const updatedCart = [...user.cart];
    const productIndex = updatedCart.findIndex(
        (item) => item.id === product.id
    );

    if (productIndex < 0) {
        updatedCart.push({ ...product,
            quantity: 1
        });
        dispatch(addToCart(updatedCart));
        dispatch(addToCartUser(updatedCart));
        navigate("/cart");
    } else {
        dispatch(increment(product.id));
        dispatch(incrementUser(product.id));
        navigate("/cart");
    }
};

export const incrementQuantity = (productId) => (dispatch) => {
    dispatch(increment(productId));
    dispatch(incrementUser(productId));
};

export const decrementQuantity = (productId) => (dispatch) => {
    dispatch(decrement(productId));
    dispatch(decrementUser(productId));
};

export const removeFromCart = (productId) => (dispatch) => {
    dispatch(remove(productId));
    dispatch(removeUser(productId));
};
