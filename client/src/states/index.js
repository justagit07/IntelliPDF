import { createSlice } from "@reduxjs/toolkit";
// 01 this is like usuall the state  like use state varible you can change state of under inital state object  from anywhere using the reducers
const initialState={
    posts:{},
    user:{},
    token:{},
}

export const authSlice= createSlice(
   {
    name: "auth",
    initialState,
    // 02 reducer is a function only nothing much 
    reducers: 
    {


     //  04 action in the  reducer function is just like the payload means argument that are passed
         setPdf:(state, action)=>
         {
            state.posts= action.payload;
            //payload is data // action object payload field

         },
         
    }
   }
)


export const {setPdf}= authSlice.actions;
export default authSlice.reducer