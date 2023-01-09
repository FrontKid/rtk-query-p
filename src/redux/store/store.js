import { configureStore } from "@reduxjs/toolkit";
import { goodsAPI } from "../goodAPI";

export const store = configureStore({
  reducer: {
    [goodsAPI.reducerPath]: goodsAPI.reducer,
  },
  middleware: (getDefault) => getDefault().concat(goodsAPI.middleware)
})