import axios from "../../api/Axiosconfig";
import { toast } from "react-toastify";
import { loaduser } from "../reducers/userSlice";
import {loadproduct} from "../reducers/productsSlice"


export const asyncLoadProduct = (product) => async (dispatch,getState)=>{
        const {data} = await axios.get('/products');
        dispatch(loadproduct(data));
}

export const asyncCreateProduct  = (product) => async (dispatch , getState) =>{
    try {
        // 
        await axios.post("/products" , product);
        dispatch(asyncLoadProduct())
        
    } catch (error) {
        toast.error("Error loading products")
    }
}

export const asyncupdateProduct = (product) => async (dispatch, getState) => {
    try {
        await axios.put(`/products/${product.id}`, product);
        dispatch(asyncLoadProduct());
    } catch (error) {
        toast.error("Error updating product");
    }
}

export const asyncdeleteProduct = (id) => async (dispatch, getState) => {
    try {
        await axios.delete(`/products/${id}`);
        dispatch(asyncLoadProduct());
    } catch (error) {
        toast.error("Error deleting product");
    }
}
