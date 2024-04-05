import { createSlice } from "@reduxjs/toolkit";
// 01 this is like usuall the state  like use state varible you can change state of under inital state object  from anywhere using the reducers
const initialState={
     currentpdf:{},
     uploads:{},
    user:{},
    accessToken:null,
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
            state.uploads= action.payload;
            //payload is data // action object payload field
         },
         settoken:(state,action)=>
         {
            state.accessToken= action.payload
         },
         setuser:(state,action)=>
         {
            state.user= action.payload
         },
         setuserpdfupload:(state,action)=>
         {
            state.user.pdfupload= [...state.user.pdfupload, action.payload]
         },
         changeuserpdfupload:(state,action)=>
         {
            state.user.pdfupload= [ ...action.payload]
         },
         setupload:(state,action)=>
         {
            state.uploads= action.payload
         },
         logout:(state,action)=>
         {
            state.accessToken= action.payload
             state.user=action.payload
             state.uploads=action.payload
             state.currentpdf= action.payload
         },
         setcurrentpdf:(state,action)=>
         {
            state.currentpdf= action.payload

         }
         
    }
   }
)


export const {setPdf, settoken,logout, setuser,setupload ,setcurrentpdf,changeuserpdfupload, setuserpdfupload}= authSlice.actions;
export default authSlice.reducer