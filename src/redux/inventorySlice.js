import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  isLoadingProducts: false,
  isAdmin: true
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setProducts: (state, action)=> {
     state.productList = action.payload;
    },
    setProductsLoading: (state, action)=> {
        state.isLoadingProducts = action.payload;
    },
    deleteProduct: (state, action) => {
        console
      state.productList = state.productList.filter(
        (product, index) => index !== action.payload
      );
    },
    disableEnableProduct: (state, action) => {
        state.productList = state.productList.map(
          (product, index) => index === action.payload?.index ? ({...product, isDisabled: action.payload.isDisabled}) : product
        );
    },
    updateProduct: (state, action) => {
        state.productList = state.productList.map(
          (product, index) => index === action.payload?.index ? action.payload.data : product
        );
    },
    updateIsAdmin: (state, action) => {
      console.log("11", action)
      state.isAdmin = action.payload;
  }
  }
});

export const {deleteProduct, updateProduct, disableEnableProduct, setProducts, setProductsLoading, updateIsAdmin} = inventorySlice.actions;

export default inventorySlice.reducer;