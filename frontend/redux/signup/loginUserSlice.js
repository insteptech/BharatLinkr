import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails, login } from "../actions/auth";

const LoginUserSlice = createSlice({
  name: "loginUser",
  initialState: {
    value: 0,
    user: [],
    userDetails:[],
    status: "",
  },
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (state, action) => {
      state.user = [];
      state.status = action.status.message;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "";
    });
    builder.addCase(getUserDetails.rejected, (state, action) => {
      state.userDetails = [];
      state.status = action.status.message;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.userDetails = action.payload.data?.data?.rows[0];
      state.status = "";
    });
  },
});

export default LoginUserSlice.reducer;
