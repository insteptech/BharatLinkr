import { createSlice } from "@reduxjs/toolkit";
import { getUsers, getUsersList } from "../actions/auth";

const signUpSlice = createSlice({
  name: "signUp",
  initialState: {
    value: 0,
    users: [],
    status: "",
    UsersList: [],
  },

  // extraReducers: {
  //   [getUsers.fulfilled]: (state, action) => {
  //     state.status = "success";
  //     state.users = action.payload;
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(getUsers.rejected, (state, action) => {
      state.users = [];
      state.status = action.status.message;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = "";
    });
    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.UsersList = action.payload;
      state.status = "";
    });
  },
});

export default signUpSlice.reducer;

