import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducres/authReducer";
import { cartReducer } from "./reducres/cartReducer";

const store = configureStore({
  reducer: {
    authReducer,
    cartReducer
  }
});

export default store;