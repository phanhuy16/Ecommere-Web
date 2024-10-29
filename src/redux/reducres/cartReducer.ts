import { createSlice } from "@reduxjs/toolkit";
import { CartModel } from "../../models/CartModel";

const initState: CartModel[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: initState
  }, reducers: {
    addCart: (state: any, action) => {
      const items: CartModel[] = [...state.data]
      const item = action.payload

      const index = items.findIndex(element => element.subProductId === item.subProductId)

      if (index !== -1) {
        items[index].count += item.count;
      } else {
        items.push(item)
      }

      state.data = items

    },
    removeCart: (state, action) => {
      const items = [...state.data]
      const item = action.payload

      const index = items.findIndex(element => element.id === item.id)

      if (index !== -1) {
        items.splice(index, 1)
      }

      state.data = items
    },
    changeCount: (state, action) => {
      const items = [...state.data]
      const { id, val } = action.payload
      const index = items.findIndex(element => element.id === id)

      if (index !== -1) {
        const newValue = items[index].count + val
        items[index].count = newValue
      }

      state.data = items
    },
    syncCart: (state, action) => {
      state.data = action.payload
    }
  }
})

export const cartReducer = cartSlice.reducer;
export const { addCart, syncCart, removeCart, changeCount } = cartSlice.actions;

export const cartSeletor = (state: any) => state.cartReducer.data;
