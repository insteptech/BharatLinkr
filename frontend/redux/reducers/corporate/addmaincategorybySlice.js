import { createSlice } from "@reduxjs/toolkit";
import { getMainCategory } from "../../actions/corporate/addmaincategory";


const addmainCategorySlice = createSlice({
  name: "maincategory",
  initialState: {
    value: 0,
    addmaincategory : [],
    status: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getMainCategory.rejected, (state, action) => {
      state.addmaincategory = [];
      state.status = action?.status?.message;
    });
    builder.addCase(getMainCategory.fulfilled, (state, action) => {
      state.addmaincategory = action?.payload?.data?.data;
      state.status = "";
    });
},
});

export default addmainCategorySlice.reducer;