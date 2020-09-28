import {createSlice} from '@reduxjs/toolkit'

export const JWTSlice = createSlice({
    name:'token',
    initialState:{
        tokenValue:"",
        userAccount:""
    },
    reducers:{
        setJWTToken:(state, action)=>{
            state.tokenValue = action.payload;
           
        },
        resetStateToken: (state)=>{
            state.tokenValue ="";
  
        },
        setUserAccount: (state, action)=>{
            state.userAccount = action.payload
        }
    
    }
})
export const {setJWTToken, resetStateToken, setUserAccount} = JWTSlice.actions

export default JWTSlice.reducer