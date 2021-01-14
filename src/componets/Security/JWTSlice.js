import { createSlice } from "@reduxjs/toolkit";

const JWTSlice = createSlice({
  name: "token",
  initialState: {
    tokenValue: "",
    userAccount: "",
    loggedIn: false,
    shoppingCart: {},
    totalCost: 0,
    GA: null,
  },
  reducers: {
    setJWTToken: (state, action) => {
      state.tokenValue = action.payload;
    },
    resetStateToken: (state) => {
      state.tokenValue = "";
    },
    setUserAccount: (state, action) => {
      state.userAccount = action.payload;
      state.loggedIn = true;
    },
    setGoogAnalyt: (state, action) => {
      state.GA = action.payload;
    },
    addToShoppingCart: (state, action) => {
      let copy = state.shoppingCart;
      // copy.push({key : action.payload.ItemVariation,
      //            value: action.payload
      // });
      copy[action.payload.ItemVariation] = Object.values(action);
      console.log(copy);
      state.shoppingCart = copy;
    },
    removeItemFromCart: (state, action) => {
      let copy = state.shoppingCart;
      delete copy[action.payload.ItemVariation];
      state.shoppingCart = copy;
      state.totalCost -= parseFloat(action.payload.cost);
    },
    clearCart: (state, action) => {
      state.shoppingCart = [];
    },
    addCost: (state, action) => {
      state.totalCost += parseFloat(action.payload);
    },
  },
});
export const {
  setJWTToken,
  resetStateToken,
  setUserAccount,
  addToShoppingCart,
  addCost,
  removeItemFromCart,
  setGoogAnalyt,
} = JWTSlice.actions;

export default JWTSlice.reducer;
