import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cardContent",
  initialState: {
    CardNumber: "",
    CardExp: "",
    CVV: "",
    NameOnCard: "",
    TotalCost: 0,
  },
  reducers: {
    setCardNumber: (state, action) => {
      state.CardNumber = action.payload;
    },
    setCardExp: (state, action) => {
      state.CardExp = action.payload;
    },
    setCVV: (state, action) => {
      state.CVV = action.payload;
    },
    setNameOnCard: (state, action) => {
      state.NameOnCard = action.payload;
    },
    changeTotalCost: (state, action) => {
      state.TotalCost += action.payload;
    },
  },
});

export const {
  setNameOnCard,
  setCardNumber,
  setCardExp,
  setCVV,
  changeTotalCost,
} = CartSlice.actions;

export default CartSlice.reducer;
