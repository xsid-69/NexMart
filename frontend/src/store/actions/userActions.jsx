import axios from "../../api/Axiosconfig";
import { toast } from "react-toastify";
import { loaduser } from "../reducers/userSlice";

export const asyncupdateUser = (user) => async (dispatch, getState) => {
    try {
        await axios.put(`/users/${user.id}`, user);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(asyncCurrentUsers());
    } catch (error) {
        toast.error("Error updating user");
    }
}


export const asyncdeleteUser = (id) => async (dispatch, getState) => {
    try {
        await axios.delete(`/users/${id}`);
        dispatch(asyncLogoutUsers());
        toast.error("User Deleted")
    } catch (error) {
        toast.error("Error deleting product");
    }
}

export const asyncCurrentUsers = (user) => async (dispatch , getState) =>{
    try {
        const user = JSON.parse(localStorage.getItem("user" ));
        if(user) dispatch(loaduser(user));
        else console.log("User not Logged in!");
        
    } catch (error) {
        
    }
}

export const asyncLogoutUsers = (user) => async (dispatch,getState) =>{
    try {
        localStorage.removeItem("user");
        dispatch(loaduser(null));
    } catch (error) {
        toast.error("Error in Loading User")
    }
}

export const asyncLoginUsers = (user) => async (dispatch,getState) =>{
    try {
         const {data}= await axios.get(
         `/users?email=${user.email}&password=${user.password}`
       ) ;
        // console.log(data[0]);
        if(data.length > 0){
            localStorage.setItem("user" , JSON.stringify(data[0]))
            dispatch(loaduser(data[0]));
        }
        return data;
    } catch (error) {
        toast.error("Error in Loading User")
    }
}

export const asyncRegisterUsers = (user) => async (dispatch,getState) =>{
    try {
        const res = await axios.post("/users" ,user);
        console.log(res);
        
    } catch (error) {
        toast.error("Error in Loading User")
    }
}
