import { configureStore } from "@reduxjs/toolkit";
import { logSlice } from "./slices/log.slice";



export const store = configureStore({
    reducer: {
      log: logSlice.reducer,
    },
});