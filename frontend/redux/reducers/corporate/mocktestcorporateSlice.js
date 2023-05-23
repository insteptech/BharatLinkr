import { createSlice } from "@reduxjs/toolkit";
import { getMockTestbyid, getMockTestCorporatelist, mocktestResult } from "../../actions/corporate/addmocktestcorporate";

const mockTestCorporateSlice = createSlice({
  name: "mocktestcorporate",
  initialState: {
    value: 0,
    mocktestcorporatelist: [],
    mocktest: [],
    mocktestResult : [],
    status: "",
  },
  extraReducers: (builder) => {
    builder.addCase(getMockTestCorporatelist.rejected, (state, action) => {
      state.mocktestcorporatelist = [];
      state.status = action?.status?.message;
    });
    builder.addCase(getMockTestCorporatelist.fulfilled, (state, action) => {
      state.mocktestcorporatelist = action?.payload?.data?.data;
      state.status = "";
    });
    builder.addCase(getMockTestbyid.rejected, (state, action) => {
      state.status = action?.status?.message;
    });
    builder.addCase(getMockTestbyid.fulfilled, (state, action) => {
      state.mocktest = action?.payload?.data?.data
    });
    builder.addCase(mocktestResult.rejected, (state, action) => {
      state.mocktestResult = [];
      state.status = action?.status?.message;
    });
    builder.addCase(mocktestResult.fulfilled, (state, action) => {
      state.mocktestResult = action?.payload?.data?.data;
      state.status = "";
    });
  },
});

export default mockTestCorporateSlice.reducer;