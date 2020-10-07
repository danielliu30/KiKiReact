import {createSlice} from '@reduxjs/toolkit'

const JWTSlice = createSlice({
    name:'token',
    initialState:{
        tokenValue:"",
        userAccount:"",
        loggedIn:false,
        shoppingCart:[]
    },
    reducers:{
        setJWTToken:(state, action)=>{
            state.tokenValue = action.payload;
           
        },
        resetStateToken: (state)=>{
            state.tokenValue ="";
  
        },
        setUserAccount: (state, action)=>{
            state.userAccount = action.payload;
            state.loggedIn = true;
        },
        addToShoppingCart:(state, action)=>{
            let copy = state.shoppingCart;
            copy.push(action.payload);
            state.shoppingCart = copy;
       
        }
    }
})
export const {setJWTToken, resetStateToken, setUserAccount, addToShoppingCart} = JWTSlice.actions

export default JWTSlice.reducer