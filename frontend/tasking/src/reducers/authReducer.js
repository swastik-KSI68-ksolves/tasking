import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../request/axiosClient";

export const login = createAsyncThunk("users/login", (values, thunkAPI) => {
  return axiosClient
    .post("/users/login", (data = values))
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(JSON.stringify(response.data));
      }
    })
    .catch((error) => thunkAPI.rejectWithValue(JSON.stringify(error)));
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    authToken: null,
    userSession: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.userSession.settings = JSON.parse(action.payload).response;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
