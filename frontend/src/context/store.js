import { configureStore } from "@reduxjs/toolkit";
import { logSlice } from "./slices/log.slice";
import { authSlice } from "./slices/auth.slice";


export const store = configureStore({
    reducer: {
      log: logSlice.reducer,
      auth: authSlice.reducer,
    },
});