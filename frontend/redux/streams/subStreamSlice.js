import { createSlice } from "@reduxjs/toolkit";
import {
  getSubStream,
  getSubstreamData,
} from "../actions/streams/addSubStream";

const subStreamSlice = createSlice({
  name: "substream",
  initialState: {
    status: "",
    subStreamValue: [],
    subStreamDetails: [],
    isLoading: false
  },
  extraReducers: (builder) => {
    builder.addCase(getSubStream.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(getSubStream.fulfilled, (state, action) => {
     state.subStreamValue = action.payload
     state.isLoading = false

    });

    // slice for substream with body
    builder.addCase(getSubstreamData.pending, (state, action) => {
      (state.status = action.payload?.status), (state.subStreamDetails = []);
    });
    builder.addCase(getSubstreamData.fulfilled, (state, action) => {
      (state.status = ""), (state.subStreamDetails = action.payload);
    });
  },
});

export default subStreamSlice.reducer;
