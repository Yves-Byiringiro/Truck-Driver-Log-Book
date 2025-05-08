import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reqInstance from "../api";


export const authSlice = createSlice({
    name: "auth",
    initialState: {
      user: {},
      tokens: {},
      isAuthenticated: false,
      loginSuccess: false,
      loginLoading: false,
      loginError: null,

      registerSuccess: false,
      registerLoading: false,
      registerError: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
      // login
      builder.addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
        state.loginSuccess = false;
        state.user = {};
        state.tokens = {};
        state.isAuthenticated = false;
      });
      builder.addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginError = null;
        state.loginSuccess = true;
        state.user = action.payload.user;
        state.tokens = action.payload.tokens;
        state.isAuthenticated = true;
        localStorage.setItem('accessToken', action.payload.tokens.access);
        localStorage.setItem('refreshToken', action.payload.tokens.refresh);
      });
      builder.addCase(login.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
        state.loginSuccess = false;
        state.user = {};
        state.tokens = {};
        state.isAuthenticated = false;
      })

      // register
      builder.addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
        state.registerSuccess = false;
      });
      builder.addCase(register.fulfilled, (state) => {
        state.registerLoading = false;
        state.registerError = null;
        state.registerSuccess = true;
      });
      builder.addCase(register.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload;
        state.registerSuccess = false;
      })
    }
});



export const login = createAsyncThunk("auth/login", async (bodyReq, thunkAPI) => {
  try {
    const response = await reqInstance.post(`/auth/login/`, bodyReq, {
        headers: {
          'Content-Type': 'application/json'
        }
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
});

export const register = createAsyncThunk("auth/register", async (bodyReq, thunkAPI) => {
  try {
    const response = await reqInstance.post(`/auth/register/`, bodyReq, {
        headers: {
          'Content-Type': 'application/json'
        }
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.error);
  }
});

