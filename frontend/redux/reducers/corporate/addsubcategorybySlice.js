import { createSlice } from "@reduxjs/toolkit";
import { getSubCategory } from "../../actions/corporate/addsubcategory";

const getSubCategorySlice = createSlice({
  name: "subcategory",
  initialState: {
    value: 0,
    addsubcategory: [],
    status: "",
    isLoading: false
  },
  extraReducers: (builder) => {
    builder.addCase(getSubCategory.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(getSubCategory.rejected, (state, action) => {
      state.isLoading = false
      state.status = action?.status?.message;
    });
    builder.addCase(getSubCategory.fulfilled, (state, action) => {
      state.addsubcategory = action?.payload?.data?.data
      state.isLoading = false
    });
  },
});

export default getSubCategorySlice.reducer;
