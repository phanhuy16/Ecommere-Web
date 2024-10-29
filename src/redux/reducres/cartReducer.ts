import { createSlice } from "@reduxjs/toolkit";
import { SubProductModel } from "../../models/Products";

const initState: SubProductModel[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: initState
  }, reducers: {
    addCart: (state: any, action) => {
      const items: SubProductModel[] = [...state.data]
      const item = action.payload

      const index = items.findIndex(element => element.id === item.id)

      if (index !== -1) {
        item[index].count += item.count;
      } else {
        items.push(item)
      }

      state.data = items

    },
  }
})

export const cartReducer = cartSlice.reducer;
export const { addCart } = cartSlice.actions;

export const cartSeletor = (state: any) => state.cartReducer.data;
