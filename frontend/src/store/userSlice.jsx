import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    data : []
}
const userSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        loaduser : (state , action ) =>{
            state.data = action.payload;
            console.log(action);
            
        },
    },
})

export const {loaduser} = userSlice.actions;

export default userSlice.reducer;