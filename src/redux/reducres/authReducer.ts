import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: {
      token: '',
      id: ''
    }
  }, reducers: {
    addAuth: (state: any, action) => {
      state.data = action.payload;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeAuth: (state, _action) => {
      state.data = {
        token: '',
        id: ''
      }
    }
  }
})

export const authReducer = authSlice.reducer;
export const { addAuth, removeAuth } = authSlice.actions;

export const authSeletor = (state: any) => state.authReducer.data;
