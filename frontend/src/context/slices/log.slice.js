import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reqInstance from "../api";


export const logSlice = createSlice({
    name: "log",
    initialState: {
        logBookAdded: {},
        addLogBookSuccess: false,
        addLogBookLoading: false,
        addLogBookError: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        // add log book
        builder.addCase(addLogBook.pending, (state) => {
          state.addLogBookLoading = true;
          state.addLogBookError = null;
          state.addLogBookSuccess = false;
          state.logBookAdded = {};
        });
        builder.addCase(addLogBook.fulfilled, (state, action) => {
          state.addLogBookLoading = false;
          state.addLogBookError = null;
          state.addLogBookSuccess = true;
          state.logBookAdded = action.payload;
        });
        builder.addCase(addLogBook.rejected, (state, action) => {
          state.addLogBookLoading = false;
          state.addLogBookError = action.payload;
          state.addLogBookSuccess = false;
          state.logBookAdded = {};
        })
    }
});

export const addLogBook = createAsyncThunk("log/addLogBook", async ({bodyReq}, thunkAPI) => {
  try {
    const response = await reqInstance.post(`/log-book/`, { bodyReq }, {
        headers: {
        //   'Authorization': `Bearer ${JSON.parse(localStorage.getItem('authTokens'))?.access}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});


export const { } = logSlice.actions;



