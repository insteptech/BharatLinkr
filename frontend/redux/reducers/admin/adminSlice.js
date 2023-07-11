import { createSlice } from "@reduxjs/toolkit";
import { collegeApprovalList } from "../../actions/auth";

const adminSlice = createSlice({
    name: "adminSlice",
    initialState: {
        isLoading: false,
        pendingApprovalList:[], 
        pendingApprovalStatus:"" 
    },
    extraReducers: (builder) => {
        builder.addCase(collegeApprovalList.pending, (state, action) => {
            state.isLoading = true

        });
        builder.addCase(collegeApprovalList.rejected, (state, action) => {
            state.isLoading = false
            state.pendingApprovalStatus = action?.status?.message;
        });
        builder.addCase(collegeApprovalList.fulfilled, (state, action) => {
            state.pendingApprovalList = action?.payload?.data?.data
            state.isLoading = false
        });
     }
})

export default adminSlice.reducer;