import { Product, Size } from "@prisma/client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem extends Product {
  quantity: number;
  size: "small" | "medium" | "large";
  newId: number;
  sizes?: Size[];
}

export interface CartState {
  products: CartItem[];
}

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingProduct = state.products.find(
        (product) => product.newId === action.payload.newId
      );

      if (existingProduct && existingProduct.size === action.payload.size) {
        existingProduct.quantity = (existingProduct.quantity ?? 0) + 1;
      } else {
        state.products.push({
          ...action.payload,
          newId: state.products.length as number,
        });
      }
    },
    updateItem: (state, action: PayloadAction<CartItem>) => {
      const productIndex = state.products.findIndex(
        (product) => product.newId === action.payload.newId
      );

      state.products[productIndex] = { ...action.payload };
    },

    deleteItem: (state, action: PayloadAction<CartItem>) => {
      state.products = state.products.filter(
        (product) => product.newId !== action.payload.newId
      );
    },
    deleteAllItems: (state) => {
      state.products = [];
    },
  },
});

export const { addItem, deleteAllItems, deleteItem, updateItem } =
  cartSlice.actions;

export default cartSlice.reducer;
